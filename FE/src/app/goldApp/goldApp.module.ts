import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { AppComponent } from './components/app.component';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApolloSetupModule } from '../apollo/apolloSetup.module';
import { CoreModule } from '../core/core.module';
import { MapModule } from '../map/map.module';
import { IGoldAppState } from './interfaces/goldApp.interface';

export function MetaReducer(reducer) {
  return function (state, action) {
    return reducer(state, action);
  };
}

export const metaReducers = [MetaReducer];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    StoreModule.forRoot({

    }, { metaReducers }),
    EffectsModule.forRoot([]),
    ApolloSetupModule,
    MapModule,
    BrowserModule,
    HttpLinkModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class GoldAppModule {

}


