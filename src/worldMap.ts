import { intersect } from './collision';
import Entity from './entity';
import { V2, v2 } from './maths';
import { IObjectLayerData, ITileData, ITileLayerData } from './tileData';
import { hsvToRgb } from './utils';

const TILE_SIZE = 32;

const tileColors: Array<{ light: string, dark: string }> = [];

const s = 1;
const highV = 0.8;
const lowV = 0.5;
for (let i = 0; i < 16; i++) {
  const h = (360 / 16) * i;
  const [r, g, b] = hsvToRgb(h, s, highV);
  const [dr, dg, db] = hsvToRgb(h, s, lowV);
  tileColors[i] = {
    dark: `rgb(${Math.floor(dr * 256)}, ${Math.floor(dg * 256)}, ${Math.floor(db * 256)}`,
    light: `rgb(${Math.floor(r * 256)}, ${Math.floor(g * 256)}, ${Math.floor(b * 256)}`,
  };
}

export default class WorldMap {
  objectLayers: IObjectLayerData[] = [];
  width: number;
  height: number;

  private data: ITileData;
  private tileLayers: ITileLayerData[] = [];

  constructor(data: ITileData) {
    this.data = data;

    for (const layer of data.layers) {
      if (layer.type === 'tilelayer') {
        const tileLayer = layer as ITileLayerData;
        this.tileLayers.push(tileLayer);
        this.width = tileLayer.width;
        this.height = tileLayer.height;
        for (let i = 0; i < tileLayer.data.length; i++) {
          if (tileLayer.data[i] !== 0) {
            // tileLayer.data[i] = Math.floor(Math.random() * 15) + 1;
            tileLayer.data[i] = (i % 15) + 1;
          }
        }
      } else if (layer.type === 'objectgroup') {
        const objectLayer = layer as IObjectLayerData;
        this.objectLayers.push(objectLayer);
      }
    }
  }

  getTileIndex(x: number, y: number) {
    return ((this.height - y - 1) * this.width) + x;
  }

  translateObjectPosition(x: number, y: number): V2 {
    return [x, (this.height * TILE_SIZE) + 31 - y];
  }

  willCollide(entity: Entity, tileX: number, tileY: number) {
    const entitySupport = entity.collisionSupport.bind(entity);
    const tileSupport = (direction: V2) => {
      const result = v2.create(tileX * TILE_SIZE, tileY * TILE_SIZE);
      if (direction[0] > 0) {
        result[0] += TILE_SIZE;
      }
      if (direction[1] > 0) {
        result[1] += TILE_SIZE;
      }
      return result;
    };
    return intersect(entitySupport, tileSupport);
  }

  findCollision(entity: Entity): {time: number, normal: V2} {
    const minX = Math.min(entity.dP[0], 0) + entity.pos[0] - entity.radius;
    const minY = Math.min(entity.dP[1], 0) + entity.pos[1] - entity.radius;
    const maxX = Math.max(entity.dP[0], 0) + entity.pos[0] + entity.radius;
    const maxY = Math.max(entity.dP[1], 0) + entity.pos[1] + entity.radius;

    const minTileX = Math.max(0, Math.floor(minX / TILE_SIZE));
    const minTileY = Math.max(0, Math.floor(minY / TILE_SIZE));
    const maxTileX = Math.floor(maxX / TILE_SIZE);
    const maxTileY = Math.floor(maxY / TILE_SIZE);

    const currentTileX = Math.floor(entity.pos[0] / TILE_SIZE);
    const currentTileY = Math.floor(entity.pos[1] / TILE_SIZE);

    const normal = [0, 0];
    let bestTime = 1;

    for (let y = minTileY; y <= maxTileY && y < this.height; y++) {
      for (let x = minTileX; x <= maxTileX && x < this.width; x++) {
        if (this.tileLayers[0].data[this.getTileIndex(x, y)] !== 0) {
          if (this.willCollide(entity, x, y)) {
            const tileNormal = [0, 0];
            let tileTime = 1;
            const tileLeft = x * TILE_SIZE;
            const tileRight = tileLeft + TILE_SIZE;
            const tileBottom = y * TILE_SIZE;
            const tileTop = tileBottom + TILE_SIZE;

            if (tileTop < entity.pos[1]) {
              tileNormal[1] = 1;
              if (entity.dP[1] < 0) {
                const distance = ((y + 1) * TILE_SIZE) - (entity.pos[1] - entity.radius);
                tileTime = Math.min(distance / entity.dP[1], tileTime);
              }
            } else if (tileBottom > entity.pos[1]) {
              tileNormal[1] = -1;
              if (entity.dP[1] > 0) {
                const distance = (y * TILE_SIZE) - (entity.pos[1] + entity.radius);
                tileTime = Math.min(distance / entity.dP[1], tileTime);
              }
            } else if (tileRight < entity.pos[0]) {
              tileNormal[0] = 1;
              if (entity.dP[0] < 0) {
                const distance = ((x + 1) * TILE_SIZE) - (entity.pos[0] - entity.radius);
                tileTime = Math.min(distance / entity.dP[0], tileTime);
              }
            } else if (tileLeft > entity.pos[0]) {
              tileNormal[0] = -1;
              if (entity.dP[0] > 0) {
                const distance = (x * TILE_SIZE) - (entity.pos[0] + entity.radius);
                tileTime = Math.min(distance / entity.dP[0], tileTime);
              }
            }

            // TODO: Collision system crappiness! Can bump off the top corner of
            // a tile even though you can only access the top.

            if (tileTime >= 0 && tileTime <= bestTime) {
              bestTime = tileTime;
              v2.clone(normal, tileNormal);
            }
          }
        }
      }
    }
    v2.normalise(normal, normal);
    return { time: bestTime, normal };
  }

  /**
   * The context should be pre-transformed to the correct viewport and orientation
   */
  draw(context: CanvasRenderingContext2D) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const tile = this.tileLayers[0].data[this.getTileIndex(x, y)];
        if (tile !== 0) {
          context.fillStyle = tileColors[tile].light;
          context.fillRect((x * TILE_SIZE), (y * TILE_SIZE), TILE_SIZE, TILE_SIZE);
          context.fillStyle = tileColors[tile].dark;
          context.beginPath();
          context.moveTo((x * TILE_SIZE), (y * TILE_SIZE));
          context.lineTo(((1 + x) * TILE_SIZE), (y * TILE_SIZE));
          context.lineTo(((1 + x) * TILE_SIZE), ((1 + y) * TILE_SIZE));
          context.closePath();
          context.fill();
          // context.strokeStyle = 'white';
          // context.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
    }
  }
}
