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
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { FragmentDefinitionNode, OperationDefinitionNode } from 'graphql';

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


    const httpApolloLink = httpLink.create({uri: environment.url});
    const webSocketApolloLink = new WebSocketLink({
      uri: environment.ws,
      options: {
        reconnect: true
      }
    });

    const splitLink = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = <OperationDefinitionNode>getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      webSocketApolloLink,
      httpApolloLink,
    );

    apollo.create({
      link: splitLink,
      cache: cache
    });
  }

}
