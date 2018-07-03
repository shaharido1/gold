import { AcEntity } from 'angular-cesium';

export interface IMapState {
}

export class MapEntity extends AcEntity {
  // id: string;
  name: string;
  zoomLevelOne?: { [key: string]: ShapeEntity };
  position?: any;
  zoomLevelTwo?: ShapeEntity[];
  zoomLevelThree?: ShapeEntity[];
}


export class ShapeEntity {
  // position: any;
  color: any;
}

export class EllipseGraphic extends ShapeEntity {
  semiMinorAxis: number;
  semiMajorAxis: number;
  // material: any;
}

export class PointGraphic extends ShapeEntity {
  pixelSize: number;
  outlineColor: any;
  outlineWidth: number;
}
