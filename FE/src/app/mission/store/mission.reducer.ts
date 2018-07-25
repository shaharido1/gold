import { IMissionState } from '../interfaces/mission.state';
import { missionIntialState } from './mission.intialState';
import {
  ChangeNameAction, MissionActions,
  MissionActionTypes
} from './mission.actions';

export function MissionReducer(state = missionIntialState, action: MissionActions): IMissionState {
  switch (action.type) {
    // case MissionActionTypes.CHANGE_NAME:
    //
    //   return { ...state, name: (action as ChangeNameAction).payload.newName };

    default:
      return state;
  }

}

