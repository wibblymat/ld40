export interface ITileLayerData {
  data: number[];
  height: number;
  name: string;
  opacity: number;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
}

export interface IMapObject {
  gid: number;
  height: number;
  id: number;
  name: string;
  rotation: number;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
}

export interface IObjectLayerData {
  draworder: string;
  name: string;
  objects: IMapObject[];
  opacity: number;
  type: string;
  visible: boolean;
  x: number;
  y: number;
}

interface ITileSet {
  firstgid: number;
  source: string;
}

export interface ITileData {
  height: number;
  layers: Array<ITileLayerData | IObjectLayerData>;

  nextobjectid: number;
  orientation: string;
  renderorder: string;
  tiledversion: string;
  tileheight: number;
  tilesets: ITileSet[];
  tilewidth: number;
  type: string;
  version: number;
  width: number;
}
