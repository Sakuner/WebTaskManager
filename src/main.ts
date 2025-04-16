import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }        from '@angular/router';
import { importProvidersFrom }  from '@angular/core';

import { AppComponent }         from './app/app.component';
import { routes }               from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
})
.catch(err => console.error(err));
