import { CoreActions, CoreActionTypes, TestAction } from './core.actions';
import { ICoreState } from '../interfaces/core.interfaces';
import { coreInitState } from './core.initState';

export function coreReducer(state = coreInitState, action: CoreActions | any): ICoreState {
  switch (action.type) {
    case CoreActionTypes.TEST :
      return { ...state, name: action.payload };

    default:
      return state;
  }
}
