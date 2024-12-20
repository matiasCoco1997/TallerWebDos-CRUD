import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { timeout } from 'rxjs';
import { provideToastr } from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({ timeOut: 900, preventDuplicates: true }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch())]
};
