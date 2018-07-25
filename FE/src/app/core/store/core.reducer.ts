import { AddMemberAction, CoreActions, CoreActionTypes, TestAction } from './core.actions';
import { ICoreState } from '../../shared/interfaces/core.interfaces';
import { coreInitState } from './core.initState';

export function coreReducer(state = coreInitState, action: CoreActions | any): ICoreState {
  switch (action.type) {
    case CoreActionTypes.TEST :
      return { ...state, name: action.payload };
    case CoreActionTypes.ADD_MEMBER :
      return { ...state,  members: [...state.members, (action as AddMemberAction).payload.newMember]};
    default:
      return state;
  }
}
