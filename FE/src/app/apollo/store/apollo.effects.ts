import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import { Inject, Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ApolloActionTypes } from './apollo.action';
import graphqlTag from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import 'rxjs-compat/add/operator/mergeMap';
import { ApolloService } from '../services/apollo.service';

@Injectable()
export class ApolloEffects {

  /**
   * @type Effect
   * @name onSelectMenuItem$
   * @ofType SelectMenuItemAction
   */
  @Effect({ dispatch: false })
  onQuery$: Observable<any> = this.actions$
    .ofType(ApolloActionTypes.QUERY)
    .map((res) => {
      return this.apolloService.query();
    })
    .map(res => console.log(res));

  constructor(protected actions$: Actions, @Inject(ApolloService) private apolloService: ApolloService) {
  }
}
