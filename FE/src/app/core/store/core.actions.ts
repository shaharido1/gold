import { Action } from '@ngrx/store';
import { Member } from '../../shared/interfaces/core.interfaces';

export enum CoreActionTypes {
  TEST = 'TEST',
  ADD_MEMBER = 'Add_Member',
}

export type CoreActions =
  TestAction
  | AddMemberAction
;

export class TestAction implements Action {
  type: string = CoreActionTypes.TEST;

  /**
   *
   * @param {string} payload change name
   */
  constructor(public payload: string) {
  }
}

export class AddMemberAction implements Action {
  type: string = CoreActionTypes.ADD_MEMBER;
  constructor (public payload: {newMember : Member}) {
  }
}
