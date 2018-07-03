import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import { Inject, Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ApolloActionTypes, SubscriberData } from './apollo.action';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import 'rxjs-compat/add/operator/mergeMap';
import { ApolloService } from '../services/apollo.service';
import { CoreActionTypes } from '../../core/store/core.actions';
import { tap, mergeMap, share, map, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CacheState } from 'apollo-angular-cache-ngrx/types';

@Injectable()
export class ApolloEffects {

  // /**
  //  * @type Effect
  //  * @name onSelectMenuItem$
  //  * @ofType SelectMenuItemAction
  //  */
  // @Effect({ dispatch: false })
  // onQuery$: Observable<any> = this.actions$
  // .ofType(ApolloActionTypes.QUERY)
  // .map((res) => {
  //   return this.apolloService.query()
  // })
  //   .map(res => console.log(res))
  //


  /**
   * @type Effect
   * @name onSelectMenuItem$
   * @ofType SelectMenuItemAction
   */
  @Effect()
  onInitApp$: Observable<any> = this.actions$
    .ofType(CoreActionTypes.INIT_APP)
    .pipe(
      mergeMap(() => this.apolloService.init()),
      filter(Boolean),
      map(data => {
        console.log(data);
         return new SubscriberData(data);
      })
    );


  constructor(protected actions$: Actions, @Inject(ApolloService) private apolloService: ApolloService, private store: Store<CacheState>) {
  }
}
