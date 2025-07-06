import { Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SidebarLayoutComponent } from './components/sidebar-layout/sidebar-layout.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';

export const routes: Routes = [ 
    {
    path: '',
    component: SidebarLayoutComponent,
    children: [
        { path: '', component: ListProductsComponent },
      { path: 'list', component: ListProductsComponent },
      { path: 'create', component: ProductFormComponent },
        { path: 'categories', component: ListCategoriesComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
       { path: 'edit/:id', component: ProductFormComponent }
    ],
  }  
   
];
