import { addBanner } from './banner';
import { intersect } from './collision';
import controls, { Key } from './controls';
import { EntityType } from './entityType';
import {
  addDebuff, debuffs, entities, level, nextLevel, player, reset, togglePause, weaponsAvailable, WeaponType,
} from './gameState';
import {
  bombIconGraphic, exitGraphic, fallbackGraphic, goblinArcherGraphic, goblinGraphic,
  grenadeGraphic, heartGraphic, mcguffinGraphic, playerGraphic, projectileGraphic, spikesGraphic,
} from './graphic';
import { V2, v2 } from './maths';
import sound from './sound';

const g = [0, -980];
const EPSILON = 0.00000001;

enum Faction {
  Foe,
  Friend,
  Neither,
}

export enum Facing {
  Left,
  Right,
  Up,
  Down,
}

enum CollisionResponse {
  Bounce,
  Stop,
  Deflect,
  TurnAround,
}

export default class Entity {
  pos: V2 = v2.create();
  dP: V2 = v2.create();
  v: V2 = v2.create();
  dV: V2 = v2.create();
  facing = Facing.Right;

  // flags
  collidable = true; // Does this entity interact with things in the same space?
  killable = false;
  controlled = false;
  // solid = false; // Solid entities cannot be in the same space as each other
  limitedLife = false;
  harmful = false;
  flying = false;
  onGround = false;
  pacer = false;
  destroyOnUse = false;
  collectable = false;
  undead = false;
  explodes = false;
  isExplosion = false; // Fairly desperate stuff at this hour

  collisionResponse = CollisionResponse.Deflect;
  health = 0;
  maxHealth = 100;
  speed = 1000;
  lifespan = 0;
  damage = 0;
  faction = Faction.Foe;
  // TODO: Weapons should be their own thing, not part of entity
  weaponTimer = 0;
  weaponRange = 200;
  radius = 8;
  target: Entity | null = null;
  onhit: ((e: Entity) => void) | null;
  mcguffins: any[] = []; // TODO: Make these better typed
  cooldown: number = 0; // Generic, used for lots of things
  ammo = 0;
  ammoMax = 0;
  ammoRegen = 1;
  ammoTimer = 0;
  weaponType: WeaponType = WeaponType.Gun;
  explosionTimer = 0;

  graphic = fallbackGraphic;

  constructor(type: EntityType, pos: V2, options: { [key: string]: any } = {}) {
    v2.clone(this.pos, pos);

    switch (type) {
      case EntityType.Player: {
        this.controlled = true;
        this.killable = true;
        this.maxHealth = 100;
        this.graphic = playerGraphic;
        this.speed = 2000;
        // this.solid = true;
        this.faction = Faction.Friend;
        this.ammoMax = 50;
        this.ammo = 50;
        break;
      }

      case EntityType.GrenadePickup: {
        this.graphic = bombIconGraphic;
        this.faction = Faction.Friend;
        this.radius = 16;
        this.onhit = (other: Entity) => {
          weaponsAvailable.push(WeaponType.Grenade);
          this.die();
        };
        break;
      }

      case EntityType.Goblin: {
        this.killable = true;
        this.maxHealth = 20;
        this.graphic = goblinGraphic;
        this.speed = 1000;
        // this.solid = true;
        this.pacer = true;
        this.harmful = true;
        this.damage = 100;
        this.collisionResponse = CollisionResponse.TurnAround;
        break;
      }

      case EntityType.GoblinArcher: {
        this.killable = true;
        this.maxHealth = 40;
        this.graphic = goblinArcherGraphic;
        this.speed = 1000;
        // this.solid = true;
        this.pacer = true;
        this.harmful = true;
        this.damage = 100;
        this.collisionResponse = CollisionResponse.TurnAround;
        this.target = player;
        this.ammo = 100;
        this.ammoMax = 100;
        this.ammoRegen = 0.1;
        break;
      }

      case EntityType.Spikes: {
        this.graphic = spikesGraphic;
        this.harmful = true;
        this.damage = 100;
        this.flying = true;
        break;
      }

      case EntityType.Projectile: {
        this.graphic = projectileGraphic;
        this.faction = options.faction || Faction.Foe;
        this.facing = options.facing || Facing.Left;
        switch (this.facing) {
          case Facing.Left: {
            v2.set(this.v, -1000, 0);
            break;
          }
          case Facing.Right: {
            v2.set(this.v, 1000, 0);
            break;
          }
          case Facing.Up: {
            v2.set(this.v, 0, 1000);
            break;
          }
          case Facing.Down: {
            v2.set(this.v, 0, -1000);
            break;
          }
        }
        this.radius = 4;
        this.limitedLife = true;
        this.lifespan = 2;
        this.harmful = true;
        this.damage = 10;
        this.flying = true;
        this.destroyOnUse = true;
        break;
      }

      case EntityType.Heart: {
        this.graphic = heartGraphic;
        this.faction = Faction.Friend;
        this.radius = 16;
        this.collectable = true;
        this.health = 10;
        break;
      }

      case EntityType.Grenade: {
        this.graphic = grenadeGraphic;
        this.radius = 8;
        this.faction = options.faction || Faction.Foe;
        this.explosionTimer = 2;
        this.explodes = true;
        this.facing = options.facing || Facing.Left;
        switch (this.facing) {
          case Facing.Left: {
            v2.set(this.v, -400, 300);
            break;
          }
          case Facing.Right: {
            v2.set(this.v, 400, 300);
            break;
          }
          case Facing.Up: {
            v2.set(this.v, 0, 500);
            break;
          }
          case Facing.Down: {
            v2.set(this.v, 0, -500);
            break;
          }
        }
        break;
      }

      case EntityType.Explosion: {
        this.radius = 0;
        this.damage = 100;
        this.faction = Faction.Neither;
        this.harmful = true;
        this.isExplosion = true;
        this.flying = true;
        this.limitedLife = true;
        this.lifespan = 1;
        break;
      }

      case EntityType.Exit: {
        this.graphic = exitGraphic;
        this.faction = Faction.Friend;
        this.radius = 16;
        this.flying = true;
        this.onhit = () => {
          if (level.mcguffinCount === player.mcguffins.length) {
            nextLevel();
          } else {
            if (this.cooldown === 0) {
              addBanner('Collect more Lava Lamps', 20);
              sound.play('click2');
              this.cooldown += 0.5;
            }
          }
        };
        break;
      }

      case EntityType.Mcguffin: {
        this.graphic = mcguffinGraphic;
        this.faction = Faction.Friend;
        this.radius = 16;
        this.onhit = (entity: Entity) => {
          // TODO: show something to the player about the new effect
          // TODO: Create some effects
          entity.mcguffins.push({});
          addDebuff();
          sound.play('click');
          this.die();
        };
        break;
      }
    }

    if (this.killable) {
      this.health = this.maxHealth;
    }
  }

  update(dT: number) {
    v2.set(this.dV, 0, 0);

    if (this.weaponTimer > 0) {
      this.weaponTimer = Math.max(0, this.weaponTimer - dT);
    }

    if (this.cooldown > 0) {
      this.cooldown = Math.max(0, this.cooldown - dT);
    }

    if (this.limitedLife) {
      this.lifespan -= dT;
    }

    if (this.lifespan < 0) {
      return this.die();
    }

    if (this.health <= 0 && this.killable) {
      if (debuffs.undead && this !== player) {
        this.undead = true;
        this.speed = 0;
        this.health = 10;
      } else {
        return this.die();
      }
    }

    if (this.explodes) {
      this.explosionTimer -= dT;
      if (this.explosionTimer < 0) {
        entities.add(new Entity(EntityType.Explosion, this.pos));
        this.die();
      }
    }

    if (this.isExplosion) {
      this.radius = Math.pow(1 - this.lifespan, 0.5) * 50;
    }

    if (this.undead && this.speed < 1000) {
      this.speed += 100 * dT;
    }

    if (this.ammo === this.ammoMax) {
      this.ammoTimer = Math.max(0, this.ammoTimer);
    } else if (this.ammoTimer > 0) {
      this.ammoTimer -= dT;
    }

    if (this.ammo < this.ammoMax && this.ammoTimer <= 0) {
      this.ammo++;
      this.ammoTimer += this.ammoRegen;
      if (debuffs.slowRegen) {
        this.ammoTimer += this.ammoRegen;
      }
    }

    if (this.controlled) {
      this.playerControl(dT);
    } else {
      if (this.pacer) {
        this.dV[0] = this.facing === Facing.Left ? -1 : 1;
      }
      if (this.target) {
        const tVec = v2.create();
        v2.sub(tVec, this.target.pos, this.pos);
        const direction = v2.angle(tVec);

        this.facing = this.target.pos[0] < this.pos[0] ? Facing.Left : Facing.Right;

        if (this.weaponRange >= v2.length(tVec)) {
          this.shoot(this.facing);
        }

        v2.normalise(tVec, tVec);
        v2.clone(this.dV, tVec);
      }
    }

    v2.mul(this.dV, this.dV, this.speed);

    if (debuffs.fastMonsters && this.faction === Faction.Foe) {
      v2.mul(this.dV, this.dV, 2);
    }
    if (this.undead) {
      v2.mul(this.dV, this.dV, 0.5);
    }

    if (!this.onGround && !this.flying) {
      v2.mul(this.dV, this.dV, 0.2);
    }

    // Friction
    const fricAcc = v2.create();
    v2.mul(fricAcc, this.v, this.onGround ? -8 : -1);
    v2.add(this.dV, this.dV, fricAcc);

    if (!this.flying) {
      v2.add(this.dV, this.dV, g);
    }

    v2.mul(this.dV, this.dV, dT); // a => at
    // equations of motion
    // v = at + u
    v2.add(this.v, this.dV, this.v);
    // dP = ut + (1/2)at^2
    const ut = v2.create();
    v2.mul(ut, this.v, dT);
    v2.mul(this.dP, this.dV, 0.5 * dT); // dP = (1/2)at^2
    v2.add(this.dP, ut, this.dP);

    this.onGround = false;
    if (this.collidable) {
      let attempts = 4;
      while (attempts--) {
        const collision = level.map.findCollision(this);
        if (collision.time < 1 && !v2.isZero(collision.normal)) {
          if (collision.normal[1] > 0.5) {
            this.onGround = true;
          }

          if (attempts === 0) {
            v2.set(this.dP, 0, 0);
          } else {
            this.updateMove(collision.normal, collision.time);
          }
          this.hit(null, dT);
        }
      }
    }

    for (const other of entities) {
      if (other !== this && other.collidable && this.willCollide(other)) {
        this.hit(other, dT);
        other.hit(this, dT);
        // if (this.solid && other.solid) {
        //   // TODO: bouncing/deflection here
        //   v2.set(this.dP, 0, 0);
        // }
      }
    }

    if (this.v[0] !== 0) {
      this.facing = this.v[0] < 0 ? Facing.Left : Facing.Right;
    }

    v2.add(this.pos, this.pos, this.dP);
  }

  shoot(facing: Facing) {
    if (this.weaponTimer === 0 && this.ammo > 0) {
      if (this.weaponType === WeaponType.Gun) {
        entities.add(new Entity(EntityType.Projectile, this.pos, { facing, faction: this.faction }));
        this.ammo--;
      } else if (this.weaponType === WeaponType.Grenade) {
        entities.add(new Entity(EntityType.Grenade, this.pos, { facing, faction: this.faction }));
        this.ammo -= 10;
      }
      sound.play('pop');
      this.weaponTimer += 0.1;
    }
  }

  playerControl(dT: number) {
    v2.set(this.dV, 0, 0);
    if (controls.isPressed(Key.Space) && this.onGround) {
      this.v[1] += 600;
      sound.play('whoop');
    }
    // if (controls.isPressed(Key.S)) {
    //   this.dV[1] = -1;
    // }
    if (controls.isPressed(Key.A)) {
      this.dV[0] = -1;
    }
    if (controls.isPressed(Key.D)) {
      this.dV[0] = 1;
    }

    if (controls.isPressed(Key.Up)) {
      this.shoot(Facing.Up);
    }
    if (controls.isPressed(Key.Down)) {
      this.shoot(Facing.Down);
    }
    if (controls.isPressed(Key.Left)) {
      this.shoot(Facing.Left);
    }
    if (controls.isPressed(Key.Right)) {
      this.shoot(Facing.Right);
    }

    if (weaponsAvailable.includes(WeaponType.Gun) && controls.isPressed(Key.One)) {
      this.weaponType = WeaponType.Gun;
    }
    if (weaponsAvailable.includes(WeaponType.Grenade) && controls.isPressed(Key.Two)) {
      this.weaponType = WeaponType.Grenade;
    }

    v2.normalise(this.dV, this.dV);
  }

  collisionSupport(direction: V2): V2 {
    const result = v2.create();
    v2.normalise(direction, direction);
    v2.mul(result, direction, this.radius);
    v2.add(result, this.pos, result);
    if (!v2.isZero(this.dP)) {
      const angle = v2.dot(this.dP, direction);
      if (angle > 0) {
        v2.add(result, result, this.dP);
      }
    }
    return result;
  }

  willCollide(other: Entity) {
    // Assume that all entities are circles for collision
    const support = this.collisionSupport;
    return intersect(support.bind(this), support.bind(other));
  }

  updateMove(normal: V2, proportion: number) {
    let bounceAmount = 1 - proportion;
    if (this.collisionResponse === CollisionResponse.Bounce) {
      bounceAmount += 0.9;
    }

    switch (this.collisionResponse) {
      case CollisionResponse.TurnAround: {
        if (this.dP[0] !== 0) {
          this.facing = this.facing === Facing.Left ? Facing.Right : Facing.Left;
        }
      }
      case CollisionResponse.Bounce:
      case CollisionResponse.Deflect: {
        const vDiff = v2.create();
        const dpDiff = v2.create();

        v2.mul(dpDiff, normal, bounceAmount * v2.dot(this.dP, normal));
        v2.sub(this.dP, this.dP, dpDiff);

        v2.mul(vDiff, normal, bounceAmount * v2.dot(this.v, normal));
        v2.sub(this.v, this.v, vDiff);
        break;
      }

      case CollisionResponse.Stop: {
        v2.set(this.dP, 0, 0);
        v2.set(this.v, 0, 0);
        break;
      }
    }
  }

  /**
   * If other is null then we collided with a wall
   */
  hit(other: Entity | null, dT: number) {
    if (!other) {
      if (this.harmful && this.destroyOnUse) {
        this.die();
      }
      return;
    }

    if (this.onhit && other === player) {
      this.onhit(other);
    }

    if (this.killable && other.harmful && this.faction !== other.faction) {
      let damage = other.damage;
      if (this === player && debuffs.doubleDamage) {
        damage *= 2;
      }
      if (other.destroyOnUse) {
        this.health -= damage;
        sound.play('urgh');
        other.die();
      } else {
        if (other.cooldown === 0) {
          this.health -= damage * 0.25;
          other.cooldown += 0.25;
          sound.play('urgh');
        }
      }
    }

    if (this.collectable && this.faction === other.faction) {
      if (this.health > 0 && other.health < other.maxHealth) {
        if (!debuffs.noHeal) {
          other.health = Math.min(other.maxHealth, other.health + this.health);
        }
        return this.die();
      }
    }
  }

  die() {
    entities.delete(this);

    if (this.killable) {
      sound.play('squelch1');
    }

    if (this === player) {
      reset();
    }
  }
}
