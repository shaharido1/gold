import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import {StoreModule} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {
  NgrxCacheModule,
  NgrxCache,
  apolloReducer,
} from 'apollo-angular-cache-ngrx';
import 'rxjs/operators/take'

@NgModule({
  imports: [
    StoreModule.forRoot({
      apollo: apolloReducer,
    }),
    NgrxCacheModule,
    ApolloModule,
  ]
})
export class ApolloSetupModule {
  constructor(apollo: Apollo, httpLink: HttpLink, ngrxCache: NgrxCache) {
    const cache = ngrxCache.create({});
    apollo.create({
      link: httpLink.create({uri: environment.url}),
      cache: cache
    });
  }

}
