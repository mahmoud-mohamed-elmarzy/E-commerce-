
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { loudingInterceptor } from './core/interceptors/louding-interceptor';
import { headerInterceptor } from './core/interceptors/header-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [

    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withViewTransitions(),
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([errorInterceptor, loudingInterceptor, headerInterceptor]),
    ),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule),
  ],
};
