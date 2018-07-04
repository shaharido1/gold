import { Component, OnInit } from '@angular/core';
import { MapLayerProviderOptions } from 'angular-cesium';

/*
  *more imagery providers here : https://cesiumjs.org/tutorials/Imagery-Layers-Tutorial/*
*/

@Component({
  selector: 'map-provider',
  templateUrl: './map-provider.component.html'
})
export class MapProviderComponent {
  options = {
    url: 'https://dev.virtualearth.net',
    key: 'AkXEfZI-hKtZ995XgjM0XHxTiXpyS4i2Vb4w08Pjozwn-NAfVIvvHBYaP6Pgi717'
  };
  mapLayerProviderOptions: MapLayerProviderOptions;

  constructor() {
    this.mapLayerProviderOptions = MapLayerProviderOptions.BingMaps;
  }

  //
  // options = {
  //   url : 'https://a.tile.openstreetmap.org',
  // }
  // mapLayerProviderOptions: MapLayerProviderOptions;
  // constructor() {
  //   this.mapLayerProviderOptions = MapLayerProviderOptions.OpenStreetMap;
  // }
}
