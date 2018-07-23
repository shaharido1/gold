import { AcEntity } from 'angular-cesium';
import { graphicConfig } from './config';

// export class MapEntity extends AcEntity {
//   name: string;
//   levels: ZoomLevels;
//   position?: any;
//
//   constructor(
//     name: string = 'test',
//     levels: ZoomLevels = {},
//     position = { x: 0, y: 0 }
//   ) {
//     super();
//     this.name = name;
//     this.levels = levels;
//     this.position = new Cesium.Cartesian3.fromDegrees(position.x, position.y);
//   }
// }

export class GraphicEntity extends AcEntity {
  name: string;
  data;
  position?: any;

  constructor(
    name: string = 'test',
    data,
    position = { x: 0, y: 0 }
  ) {
    super();
    this.name = name;
    this.data = data;
    this.position = new Cesium.Cartesian3.fromDegrees(position.x, position.y);
  }
}

export class ShapeEntity {
  color;
  distanceDisplayCondition: IDistanceDisplayCondition;

  constructor(
    color: any = Cesium.Color,
    distanceDisplayCondition: IDistanceDisplayCondition = ZoomLevelViewDistance.first
  ) {
    this.color = color;
    this.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(
      distanceDisplayCondition.near,
      distanceDisplayCondition.far
    );
  }
}

export class EllipseGraphic extends ShapeEntity {
  semiMinorAxis: number;
  semiMajorAxis: number;
  color: any;
  _multiplier: number;
  _scaleStep: number;
  _scaleLevel: number;
  _opacityLevel: number;
  //TODO get from appConfig
  _minSize = 100000;

  constructor(
    rank: number = 1,
    category: string = 'a',
    opacity: number = 0.1,
    scale: number = 1,
    distanceDisplayCondition: IDistanceDisplayCondition = ZoomLevelViewDistance.first
  ) {
    super(distanceDisplayCondition);
    this.color = Cesium.Color[Color[category]].withAlpha(opacity);
    this._multiplier = rank;
    this._opacityLevel = opacity;
    this._scaleLevel = scale;
    this.setAxis();
  }

  setAxis() {
    this.calculateScaleStep();
    this.semiMajorAxis = this.semiMinorAxis =
      this._scaleStep * this._scaleLevel;
  }

  calculateScaleStep() {
    this._scaleStep = this._minSize * this._multiplier;
  }
}

export class PointGraphic extends ShapeEntity {
  pixelSize: number;
  outlineColor: any;
  outlineWidth: number;

  constructor(
    category: string = 'a',
    pixelSize: number = 0,
    outlineColor: any = Cesium.Color.WHITE,
    outlineWidth: number = 1,
    distanceDisplayCondition: IDistanceDisplayCondition = ZoomLevelViewDistance.first
  ) {
    super(Cesium.Color[Color[category]], distanceDisplayCondition);
    this.outlineColor = outlineColor;
    this.pixelSize = pixelSize;
    this.outlineWidth = outlineWidth;
  }
}

export class LabelGraphic extends ShapeEntity {
  title: string;
  font: string;
  horizontalOrigin: any;
  verticalOrigin: any;
  pixelOffset: any;

  constructor(
    category: string = 'a',
    title: string = 'test',
    distanceDisplayCondition: IDistanceDisplayCondition = ZoomLevelViewDistance.second,
    font: string = graphicConfig.font,
    horizontalOrigin: any = graphicConfig.horizontalOrigin,
    verticalOrigin: any = graphicConfig.verticalOrigin,
    pixelOffset: any = graphicConfig.pixelOffset
  ) {
    super(Cesium.Color[Color[category]], distanceDisplayCondition);
    this.verticalOrigin = verticalOrigin;
    this.horizontalOrigin = horizontalOrigin;
    this.font = font;
    this.pixelOffset = pixelOffset;
    this.title = title;
  }
}

export class BillboardGraphic extends ShapeEntity {
  image: string;
  scale: number;

  constructor(
    category: string = 'a',
    distanceDisplayCondition = ZoomLevelViewDistance.second,
    image: any = Math.floor(Math.random() * 10) % 2 === 0
      ? IconsArr[0]
      : IconsArr[1],
    scale: number = 0.1
  ) {
    super(Cesium.Color[Color[category]], distanceDisplayCondition);
    this.image = image;
    this.scale = scale;
  }
}

export enum EllipseScaleLevel {
  First = 1.0,
  Second = 1.5,
  Third = 2
}

export enum EllipseOpacityLevel {
  First = 0.3,
  Second = 0.25,
  Third = 0.1
}

export enum Color {
  'a' = 'RED',
  'b' = 'BLUE',
  'c' = 'GREEN'
}

export const ZoomLevelViewDistance = {
  first: { near: 5.5e6, far: Number.MAX_VALUE },
  second: { near: 0, far: 5.5e6 },
  third: { near: 0, far: 0 }
};

export interface IDistanceDisplayCondition {
  near: number;
  far: number;
}

export interface ZoomLevels {
  level1?: { [key: string]: ShapeEntity };
  level2?: { [key: string]: ShapeEntity };
  level3?: { [key: string]: ShapeEntity };
}

export const IconsArr = [
  'assets/icons/fighter-jet.png',
  'assets/icons/volkswagen-car-side-view.png'
];
