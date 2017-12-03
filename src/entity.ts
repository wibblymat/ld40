import { intersect } from './collision';
import controls, { Key } from './controls';
import { entities, newLevel, player, worldMap } from './gameState';
import { Graphic } from './graphic';
// import { canvas, context } from './display';
import { V2, v2 } from './maths';

const playerGraphic = new Graphic('sprites.png', 0, 2);
const fallbackGraphic = new Graphic('sprites.png', 1, 2);

const g = [0, -980];
const EPSILON = 0.00000001;

export enum EntityType {
  Player,
  Heart,
  Mcguffin,
  Goblin,
  Projectile,
}

enum Faction {
  Foe,
  Friend,
}

export enum Facing {
  Left,
  Right,
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

  collisionResponse = CollisionResponse.Deflect;
  health = 0;
  maxHealth = 100;
  speed = 1000;
  lifespan = 0;
  damage = 0;
  faction = Faction.Foe;
  // TODO: Weapons should be their own thing, not part of entity
  weaponTimer = 0;
  weaponRange = 500;
  radius = 8;
  target: Entity | null = null;

  graphic: Graphic = fallbackGraphic;

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
        break;
      }

      case EntityType.Goblin: {
        this.killable = true;
        this.maxHealth = 20;
        // this.graphic =
        this.speed = 1000;
        // this.solid = true;
        this.pacer = true;
        this.harmful = true;
        this.damage = 100;
        this.collisionResponse = CollisionResponse.TurnAround;
        break;
      }

      case EntityType.Projectile: {
        // this.graphic =
        this.facing = options.facing || Facing.Left;
        this.faction = options.faction || Faction.Foe;
        v2.set(this.v, 1000, 0);
        if (this.facing === Facing.Left) {
          v2.invert(this.v, this.v);
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
        // this.graphic =
        this.faction = Faction.Friend;
        this.radius = 6;
        this.collectable = true;
        this.health = 10;
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

    if (this.limitedLife) {
      this.lifespan -= dT;
    }

    if (this.lifespan < 0) {
      this.die();
    }

    if (this.health <= 0 && this.killable) {
      this.die();
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
          this.shoot();
        }

        v2.normalise(tVec, tVec);
        // v2.clone(this.dV, tVec);
      }
    }

    v2.mul(this.dV, this.dV, this.speed);

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
        const collision = worldMap.findCollision(this);
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

  shoot() {
    if (this.weaponTimer === 0) {
      entities.add(new Entity(EntityType.Projectile, this.pos, { facing: this.facing, faction: this.faction }));
      this.weaponTimer += 0.1;
    }
  }

  playerControl(dT: number) {
    v2.set(this.dV, 0, 0);
    if (controls.isPressed(Key.W) && this.onGround) {
      this.v[1] += 600;
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

    if (controls.isPressed(Key.Down)) {
      this.shoot();
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

    if (this.killable && other.harmful && this.faction !== other.faction) {
      if (other.destroyOnUse) {
        this.health -= other.damage;
        other.die();
      } else {
        this.health -= other.damage * dT;
      }
    }

    if (this.collectable && this.faction === other.faction) {
      if (this.health > 0 && other.health < other.maxHealth) {
        other.health = Math.min(other.maxHealth, other.health + this.health);
        this.die();
      }
    }
  }

  die() {
    entities.delete(this);

    if (this === player) {
      newLevel();
    }
  }
}