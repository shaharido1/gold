import { Action } from '@ngrx/store';

export enum ApolloActionTypes {
  QUERY = 'QUERY',
  SUBSCRIBER_DATA = 'SUBSCRIBER_DATA'
}


export type ApolloActions =
  QueryAction | SubscriberData


export class QueryAction implements Action {
  type: string = ApolloActionTypes.QUERY;

  constructor() {
  }
}

export class SubscriberData implements Action {
  type: string = ApolloActionTypes.SUBSCRIBER_DATA;

  constructor(public payload: any) {
  }
}
