import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { productReducer } from './store/product/product-reducer';
import { ProductEffects } from './store/product/product-effects';
import { categoriesReducer } from './store/category/category-reducer'
import { CategoryEffects } from './store/category/category-effects';
import { invoiceReducer } from './store/invoice/invoice-reducer';
import { InvoiceEffects } from './store/invoice/invoice-effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({ products: productReducer, categories : categoriesReducer, invoice: invoiceReducer}), 
    provideEffects([ProductEffects, CategoryEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
       provideEffects(InvoiceEffects),
    provideAnimations(),
    provideToastr()
  ]
};