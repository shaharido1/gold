import { mapInitState } from './map.initState';
import { MapActions } from './map.actions';
// import { IMapState } from '../interfaces/map.interfaces';

export function MapReducer(state = mapInitState, action: MapActions | any) {
  switch (action.type) {

    default:
      return state;
  }
}
