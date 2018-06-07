import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { MapReducer } from './store/map.reducer';
import { mapFeatureKey } from './store/map.selectors';
import { MapComponent } from './components/map.component';



@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(mapFeatureKey, MapReducer),
  ],
  exports: [
    MapComponent
  ]
})

export class MapModule {

}
