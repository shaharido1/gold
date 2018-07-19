import { mapInitState } from './map.initState';
import { MapActions } from './map.actions';
import { IMapState } from '../interfaces/map.interfaces';

export function mapReducer(state = mapInitState, action: MapActions | any): IMapState {
  switch (action.type) {

    default:
      return state;
  }
}
