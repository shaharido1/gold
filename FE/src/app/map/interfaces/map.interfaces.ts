import { AcEntity } from 'angular-cesium';

export interface IMapState {
}

export class MapEntity extends AcEntity {
  // id: string;
  name: string;
  zoomLevelOne?: { [key: string]: ShapeEntity };
  position?: any;
  zoomLevelTwo?: { [key: string]: ShapeEntity };
  zoomLevelThree?: { [key: string]: ShapeEntity };
}

export class ShapeEntity {
  color: any;
  distanceDisplayCondition: any;
}

export class EllipseGraphic extends ShapeEntity {
  semiMinorAxis: number;
  semiMajorAxis: number;
}

export class PointGraphic extends ShapeEntity {
  pixelSize: number;
  outlineColor: any;
  outlineWidth: number;
}

export class LabelGraphic extends ShapeEntity {
  title: string;
  font: string;
  horizontalOrigin: any;
  verticalOrigin: any;
  pixelOffset: any;
}

export class BillboardGraphic extends ShapeEntity {
  image: string;
  scale: number;
}

export enum Color {
  'a' = 'RED',
  'b' = 'BLUE'
}

export const IconsArr = [
  'assets/icons/fighter-jet.png',
  'assets/icons/volkswagen-car-side-view.png',
];

