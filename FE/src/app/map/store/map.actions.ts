import { Action } from '@ngrx/store';

export enum MapActionTypes {
  TEST = 'TEST'
}


export type MapActions =
  TestAction


export class TestAction implements Action {
  type: string = MapActionTypes.TEST;

  /**
   *
   * @param {string} payload change name
   */
  constructor(public payload: string) {
  }
}

