import { IMapState } from '../interfaces/map.interfaces';
import {  ActionType } from 'angular-cesium';

export const mapInitState: IMapState = {
  entities:
    [{
      actionType: ActionType.ADD_UPDATE,
      id: '123',
      entity: ({
        name: 'test',
        image: new Cesium.PinBuilder().fromText('?', Cesium.Color.BLACK, 48).toDataURL(),
        bbPosition: new Cesium.Cartesian3.fromDegrees(-55.1641667, 30.5522222)
      })
    }]
};



