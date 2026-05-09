import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loudingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerService = inject(NgxSpinnerService);
  const platformId = inject(PLATFORM_ID); 

  if (isPlatformBrowser(platformId)) {
    ngxSpinnerService.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (isPlatformBrowser(platformId)) {
        ngxSpinnerService.hide();
      }
    }),
  );
};
