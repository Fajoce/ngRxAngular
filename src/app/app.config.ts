import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { productReducer } from './store/product-reducer';
import { ProductEffects } from './store/product-effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({ products: productReducer }), // 👈 ESTE NOMBRE DEBE SER "products"
    provideEffects([ProductEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideAnimations(),
    provideToastr()
  ]
};