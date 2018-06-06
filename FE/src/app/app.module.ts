import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { AppComponent } from './app.component';
import {StoreModule} from '@ngrx/store';
import { environment } from '../environments/environment';
// import {
//   NgrxCacheModule,
//   NgrxCache,
//   apolloReducer,
// } from 'apollo-angular-cache-ngrx';
import {InMemoryCache} from 'apollo-cache-inmemory';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    // StoreModule.forRoot({
    //   apollo: apolloReducer,
    // }),
    //NgrxCacheModule,
    BrowserModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      // By default, this client will send queries to the
      // `/graphql` endpoint on the same host
      link: httpLink.create({uri: environment.url}),
      cache: new InMemoryCache(),
    });
  }

}
