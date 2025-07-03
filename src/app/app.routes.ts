import { Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [ 
    { path: '', component: ListProductsComponent },
    { path: 'list', component: ListProductsComponent },
    { path: 'create', component: ProductFormComponent },
    { path: 'edit/:id', component: ProductFormComponent }
];
