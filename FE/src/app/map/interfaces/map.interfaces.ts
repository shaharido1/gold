import { AcEntity, Cartesian3 } from 'angular-cesium';

export interface IMapState {
}

export class MapEntity extends AcEntity {
  private name:string;
  private image: string;
  private bbPosition: Cartesian3;
  // polylinePosition: Cartesian3,
  // polylineWidth: number,
  // material: {
  //   glowPower: number,
  //   color: 'string'
  // }
}
