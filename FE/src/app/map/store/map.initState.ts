import { IMapState } from '../interfaces/map.interfaces';
import { AcNotification, ActionType } from 'angular-cesium';
import { Guid } from 'guid-typescript';

export const mapInitState: IMapState = {
  entities:
    [{
      id: Guid.create().value,
      entity: ({
        name: 'test',
        image: new Cesium.PinBuilder().fromText('?', Cesium.Color.BLACK, 48).toDataURL(),
        bbPosition: new Cesium.Cartesian3.fromDegrees(-55.1641667, 30.5522222)
      }),
      actionType: ActionType.ADD_UPDATE
    }]
};



