import { mapInitState } from './map.initState';
import { LoadAction, MapActions, MapActionTypes } from './map.actions';
import { IMapState } from '../interfaces/map.interfaces';

export function MapReducer(state = mapInitState, action: MapActions | any): IMapState {
  switch (action.type) {
    case MapActionTypes.LOAD:
      const newEntities = action.payload;
      return {
        entities: newEntities
      }
    case MapActionTypes.DELETE:
      const deletedEntities = [];
      const entities = action.payload;
      entities.forEach(entity => deletedEntities.push(entity));
      deletedEntities.forEach(entity => entity.actionType = 1);
      return{
        entities: deletedEntities
      }
    default:
      return state;
  }
}
