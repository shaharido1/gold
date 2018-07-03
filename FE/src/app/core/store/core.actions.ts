import { Action } from '@ngrx/store';

export enum CoreActionTypes {
  TEST = 'TEST',
  INIT_APP = 'INIT_APP'
}


export type CoreActions =
  TestAction | InitAppAction


export class TestAction implements Action {
  type: string = CoreActionTypes.TEST;

  /**
   *
   * @param {string} payload change name
   */
  constructor(public payload: string) {
  }
}

export class InitAppAction implements Action {
  type: string = CoreActionTypes.INIT_APP;
}
