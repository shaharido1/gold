import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { GoldAppModule } from './app/goldApp/goldApp.module';

if (environment.production) {
  enableProdMode();
}
window['CESIUM_BASE_URL'] = '/assets/cesium/';
platformBrowserDynamic().bootstrapModule(GoldAppModule)
  .catch(err => console.log(err));
