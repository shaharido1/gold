import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { MapReducer } from './store/map.reducer';
import { mapFeatureKey } from './store/map.selectors';
import { MapComponent } from './components/mapComponent/map.component';
import { AngularCesiumModule } from 'angular-cesium';
import { EntitiesComponent } from './components/entitiesComponent/entities.component';



@NgModule({
  declarations: [
    MapComponent,
    EntitiesComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(mapFeatureKey, MapReducer),
    AngularCesiumModule.forRoot()
  ],
  exports: [
    MapComponent
  ]
})

export class MapModule {

}
