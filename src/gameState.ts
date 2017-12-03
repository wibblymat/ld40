import { addBanner, addTopBanner } from './banner';
import Entity from './entity';
import { EntityType } from './entityType';
import { getLevel, Level } from './levels';
import { v2 } from './maths';

export enum WeaponType {
  Gun,
  Grenade,
}

export const entities: Set<Entity> = new Set();
export let player: Entity;
export let level: Level;
export let paused = false;
export const weaponsAvailable: WeaponType[] = [WeaponType.Gun];
export const debuffs = {
  doubleDamage: false,
  fastMonsters: false,
  noHeal: false,
  slowRegen: false,
  undead: false,
};

let currentLevelId = 0;

export function reset() {
  player = new Entity(EntityType.Player, [20, 20]);
  changeLevel(currentLevelId);
}

export function togglePause() {
  paused = !paused;
}

export function nextLevel() {
  changeLevel(currentLevelId + 1);
}

export function addDebuff() {
  const available: string[] = [];

  if (!debuffs.doubleDamage) {
    available.push('doubleDamage');
  }
  if (!debuffs.noHeal) {
    available.push('noHeal');
  }
  if (!debuffs.fastMonsters) {
    available.push('fastMonsters');
  }
  if (!debuffs.slowRegen) {
    available.push('slowRegen');
  }
  if (!debuffs.undead) {
    available.push('undead');
  }

  const choice = Math.floor(Math.random() * available.length);

  switch (available[choice]) {
    case 'doubleDamage': {
      debuffs.doubleDamage = true;
      addBanner('Curse: Enemy Damage X2', 50);
      break;
    }
    case 'fastMonsters': {
      debuffs.fastMonsters = true;
      addBanner('Curse: Fast enemies', 50);
      break;
    }
    case 'noHeal': {
      debuffs.noHeal = true;
      addBanner('Curse: No healing', 50);
      break;
    }
    case 'slowRegen': {
      debuffs.slowRegen = true;
      addBanner('Curse: Ammo regen 50%', 50);
      break;
    }
    case 'undead': {
      debuffs.undead = true;
      addBanner(`Curse: Enemies don't stay dead`, 45);
      break;
    }
  }
}

export function changeLevel(id: number) {
  addTopBanner(`Level ${id + 1}`, 80);
  if (id === 0) {
    addBanner('A,  D to move', 30);
    addBanner('Space to jump', 30);
    addBanner('Arrow keys shoot', 30);
    addBanner('Collect cursed lava lamps to open the door', 30);
    addBanner('Lava lamp curses last the rest of the level', 30);
    addBanner('(or until you die!)', 30);
  }

  debuffs.doubleDamage = false;
  debuffs.fastMonsters = false;
  debuffs.noHeal = false;
  debuffs.slowRegen = false;
  debuffs.undead = false;

  currentLevelId = id;
  level = getLevel(id);
  entities.clear();
  v2.clone(player.pos, level.spawn);
  player.mcguffins = [];
  const levelEntities = level.getEntities();
  entities.add(player);
  for (const entity of levelEntities) {
    entities.add(entity);
  }
}
