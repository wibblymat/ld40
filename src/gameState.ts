import Entity, { EntityType } from './entity';
import WorldMap from './worldMap';

export const entities: Set<Entity> = new Set();
export let player: Entity = new Entity(EntityType.Player, [20, 20]);
export let worldMap: WorldMap;

export function newLevel() {
  entities.clear();
  player = new Entity(EntityType.Player, [200, 1000]);
  worldMap = new WorldMap();
  entities.add(player);
  entities.add(new Entity(EntityType.Goblin, [150, 200]));
  entities.add(new Entity(EntityType.Heart, [450, 200]));
  entities.add(new Entity(EntityType.Heart, [550, 200]));
  entities.add(new Entity(EntityType.Heart, [650, 200]));
}
