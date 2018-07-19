import { Action } from '@ngrx/store';

export enum ApolloActionTypes {
  QUERY = 'QUERY',
}

export type ApolloActions =
  QueryAction;

export class QueryAction implements Action {
  type: string = ApolloActionTypes.QUERY;

  constructor() {
  }
}
