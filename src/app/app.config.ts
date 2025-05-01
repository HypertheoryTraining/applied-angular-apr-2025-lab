import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { HitCounter } from '@app-shared/services/hit-counter';
import { AuthStore } from '@app-shared/stores/auth-store';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withPreloading(PreloadAllModules),
    ),
    HitCounter, // a singleton provided globally through my application - still created lazily, but never taken away (unless you reload the page)
    AuthStore,
    provideHttpClient(),
  ],
};
