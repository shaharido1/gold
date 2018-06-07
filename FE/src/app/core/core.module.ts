import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CoreReducer } from './store/core.reducer';
import { coreFeatureKey } from './store/core.selectors';
import { CoreComponent } from './components/core.component';



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

}
