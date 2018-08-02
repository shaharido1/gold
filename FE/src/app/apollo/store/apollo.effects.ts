import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ApolloActionTypes } from './apollo.action';
import 'rxjs/add/operator/mergeMap';
import { ApolloService } from '../services/apollo.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ApolloEffects {

  /**
   * @type Effect
   * @name onSelectMenuItem$
   * @ofType SelectMenuItemAction
   */
  @Effect({ dispatch: false })
  onQuery$: Observable<any> = this.actions$.pipe(
    ofType(ApolloActionTypes.QUERY),
    map((res) => {
      return this.apolloService.query();
    }),
    map(res => console.log(res))
  );

  constructor(protected actions$: Actions, @Inject(ApolloService) private apolloService: ApolloService) {
  }
}
