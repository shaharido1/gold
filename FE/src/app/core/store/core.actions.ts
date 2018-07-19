import { Action } from '@ngrx/store';

export enum CoreActionTypes {
  TEST = 'TEST',
}

export type CoreActions =
  TestAction;

export class TestAction implements Action {
  type: string = CoreActionTypes.TEST;

  /**
   *
   * @param {string} payload change name
   */
  constructor(public payload: string) {
  }
}
