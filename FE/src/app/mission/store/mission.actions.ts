
import { Action } from '@ngrx/store';

export const MissionActionTypes = {
  CHANGE_NAME: 'CHANGE_NAME',
  // ADD_MEMBER: 'Add_Member'
};

export type MissionActions =
  ChangeNameAction
  // | AddMemberAction
  ;


export class ChangeNameAction implements Action {
  type = MissionActionTypes.CHANGE_NAME;
  constructor(public payload: { newName: string }) {
  }
}

// export class AddMemberAction implements Action {
//   type = MissionActionTypes.ADD_MEMBER;
//   constructor(public payload: {newMember: any}) {
//
//   }
// }


