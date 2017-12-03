import Entity from './entity';
import { EntityType } from './entityType';
import { V2, v2 } from './maths';
import WorldMap from './worldMap';

const levelFiles = ['level1.json', 'level2.json'];
const levels: Level[] = [];

export const levelsLoaded = Promise.all(levelFiles.map(loadLevel));

export function getLevel(id: number) {
  return levels[id % levels.length];
}

async function loadLevel(name: string, index: number) {
  const response = await fetch(`levels/${name}`);
  const data = await response.json();
  const map = new WorldMap(data);
  const level = new Level(map);
  levels[index] = level;
}

// Stupidness. Tiled shows the ids as one less than actually found in the file
enum MapObjectType {
  Spawn = 65,
  Exit = 66,
  Creature1 = 97,
  Creature2 = 98,
  Creature3 = 99,
  Mcguffin = 129,
  Heart = 130,
  Spikes = 131,
}

const ObjectToEntityMap: {[key: number]: EntityType} = {
  [MapObjectType.Exit]: EntityType.Exit,
  [MapObjectType.Creature1]: EntityType.Goblin,
  [MapObjectType.Heart]: EntityType.Heart,
  [MapObjectType.Mcguffin]: EntityType.Mcguffin,
  [MapObjectType.Spikes]: EntityType.Spikes,
};

export class Level {
  spawn: V2 = v2.create();
  mcguffinCount = 0;

  constructor(public map: WorldMap) {
    // TODO: Set spawn from map here
    for (const layer of map.objectLayers) {
      for (const obj of layer.objects) {
        const type = obj.gid as MapObjectType;
        if (type === MapObjectType.Spawn) {
          v2.clone(this.spawn, map.translateObjectPosition(obj.x, obj.y));
        }
        if (type === MapObjectType.Mcguffin) {
          this.mcguffinCount++;
        }
      }
    }
  }

  getEntities(): Entity[] {
    const result: Entity[] = [];

    for (const layer of this.map.objectLayers) {
      for (const obj of layer.objects) {
        const type = obj.gid as MapObjectType;
        if (ObjectToEntityMap[type]) {
          result.push(new Entity(ObjectToEntityMap[type], this.map.translateObjectPosition(obj.x, obj.y)));
        }
      }
    }
    return result;
  }
}
