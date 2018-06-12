import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { GoldAppModule } from './app/goldApp/goldApp.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(GoldAppModule)
  .catch(err => console.log(err));
