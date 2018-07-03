import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import { CoreReducer } from './store/core.reducer';
import { coreFeatureKey } from './store/core.selectors';
import { CoreComponent } from './components/core/core.component';
import { IGoldAppState } from '../goldApp/interfaces/goldApp.interface';
import { ICoreState } from './interfaces/core.interfaces';
import { InitAppAction } from './store/core.actions';



@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(coreFeatureKey, CoreReducer),
  ],
  exports: [
    CoreComponent
  ]
})

export class CoreModule {
  constructor(store: Store<ICoreState>) {
    store.dispatch(new InitAppAction())
  }

}
