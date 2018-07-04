import { AcEntity } from 'angular-cesium';

export interface IMapState {
}

export class MapEntity extends AcEntity {
  name: string;
  levels: ZoomLevels;
  position?: any;

  constructor(
    name: string = 'test',
    levels: ZoomLevels = {},
    position = { x: 0, y: 0 }
  ) {
    super();
    this.name = name;
    this.levels = levels;
    this.position = new Cesium.Cartesian3.fromDegrees(position.x, position.y);
  }
}

export interface ZoomLevels {
  level1?: { [key: string]: ShapeEntity };
  level2?: { [key: string]: ShapeEntity };
  level3?: { [key: string]: ShapeEntity };
}

export class ShapeEntity {
  color: any;
  distanceDisplayCondition: any;

  constructor(
    color: any = Cesium.Color.BLACK,
    distanceDisplayCondition: IDistanceDisplayCondition = ZoomLevelViewDistance.first
  ) {
    this.color = color;
    this.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(distanceDisplayCondition.near, distanceDisplayCondition.far);
  }
}

export class EllipseGraphic extends ShapeEntity {
  semiMinorAxis: number;
  semiMajorAxis: number;
  color: any;
  private _multiplier;
  private _scaleStep: number;
  private _scaleLevel;
  private _opacityLevel;
  //TODO get from appConfig
  private _minSize = 100000;
  private;

  constructor(rank: number = 1, category: string = 'a', opacityLevel: number = 0.1, scaleLevel: number = 1, distanceDisplayCondition: IDistanceDisplayCondition = ZoomLevelViewDistance.first) {
    super(distanceDisplayCondition);
    this.color = Cesium.Color[Color[category]].withAlpha(opacityLevel);
    this._multiplier = rank;
    this._opacityLevel = opacityLevel;
    this._scaleLevel = scaleLevel;
    this.setAxis();
  }

  setAxis() {
    this.calculateScaleStep();
    this.semiMajorAxis = this.semiMinorAxis = this._scaleStep * this._scaleLevel;
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
    distanceDisplayCondition: IDistanceDisplayCondition = ZoomLevelViewDistance.second,
    title: string = 'test',
    font: string = '15px sans-serif',
    horizontalOrigin: any = Cesium.HorizontalOrigin.CENTER,
    verticalOrigin: any = Cesium.VerticalOrigin.TOP,
    pixelOffset: any = new Cesium.Cartesian2(0, 15)
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

  constructor(category: string = 'a', distanceDisplayCondition = ZoomLevelViewDistance.second, image: any = Math.floor(Math.random() * 10) % 2 === 0 ? IconsArr[0] : IconsArr[1], scale: number = 0.1) {
    super(Cesium.Color[Color[category]], distanceDisplayCondition);
    this.image = image;
    this.scale = scale;
  }
}

export enum Color {
  'a' = 'RED',
  'b' = 'BLUE',
  'c' = 'GREEN'
}

export const IconsArr = [
  'assets/icons/fighter-jet.png',
  'assets/icons/volkswagen-car-side-view.png'
];

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

export const ZoomLevelViewDistance = {
  first: { near: 5.5e6, far: Number.MAX_VALUE },
  second: { near: 0, far: 5.5e6 },
  third: { near: 0, far: 0 }
};

export interface IDistanceDisplayCondition {
  near: number;
  far: number;
}
