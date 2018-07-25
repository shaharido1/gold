import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { coreReducer } from './store/core.reducer';
import { coreFeatureKey } from './store/core.selectors';
import { CoreComponent } from './components/core/core.component';


@NgModule({
  declarations: [
    CoreComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(coreFeatureKey, coreReducer),
  ],
  exports: [
    CoreComponent,
  ],
})

export class CoreModule {

}
