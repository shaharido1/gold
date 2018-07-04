import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { MapReducer } from './store/map.reducer';
import { mapFeatureKey } from './store/map.selectors';
import { MapComponent } from './components/mapComponent/map.component';
import { AngularCesiumModule } from 'angular-cesium';
import { ZoomLevelOneComponent } from './components/zoom-level-one/zoom-level-one.component';
import { ZoomLevelTwoComponent } from './components/zoom-level-two/zoom-level-two.component';
import { MapProviderComponent } from './components/map-provider/map-provider.component';



@NgModule({
  declarations: [
    MapComponent,
    ZoomLevelOneComponent,
    ZoomLevelTwoComponent,
    MapProviderComponent
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
