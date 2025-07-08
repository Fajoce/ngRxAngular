import { Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SidebarLayoutComponent } from './components/sidebar-layout/sidebar-layout.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ReportComponent } from './components/report/report.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';

export const routes: Routes = [
  {
    path: '',
    component: SidebarLayoutComponent,
    children: [
      { path: '', component: ListProductsComponent },
      { path: 'list', component: ListProductsComponent },
      { path: 'create', component: ProductFormComponent },
      { path: 'list-category', component: ListCategoriesComponent },
      { path: 'categories', component: CategoryFormComponent },
       { path: 'report', component: ReportComponent },
        { path: 'invoice', component: InvoiceFormComponent },
      { path: 'edit/:id', component: ProductFormComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }      
    ],
  },
];
