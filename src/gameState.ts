import { addBanner } from './banner';
import Entity from './entity';
import { EntityType } from './entityType';
import { getLevel, Level } from './levels';
import { v2 } from './maths';

export const entities: Set<Entity> = new Set();
export let player: Entity;
export let level: Level;
export let paused = false;
export const debuffs = {
  doubleDamage: false,
  fastMonsters: false,
  noHeal: false,
  slowRegen: false,
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

}

export function changeLevel(id: number) {
  addBanner(`Level ${id + 1}`, 80);
  if (id === 0) {
    addBanner('A,  D to move', 30);
    addBanner('Space to jump', 30);
    addBanner('Arrow keys shoot', 30);
  }

  debuffs.doubleDamage = false;
  debuffs.fastMonsters = false;
  debuffs.noHeal = false;
  debuffs.slowRegen = false;

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
