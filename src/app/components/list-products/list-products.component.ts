import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import * as ProductActions from '../../store/product-action';
import * as fromProduct from '../../store/product-selector';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {
  displayedColumns: string[] = ['id','name', 'price', 'category', 'actions'];
  products$: Observable<Product[]>;
  error$: Observable<string | null>;

  constructor(private store: Store, private router: Router) {
    this.products$ = this.store.select(fromProduct.selectAllProducts);
    this.error$ = this.store.select(fromProduct.selectProductError);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  edit(prod: Product) {
    this.router.navigate(['/edit', prod.id]);
  }

  remove(id: number) {
    if (confirm('¿Deseas eliminar este producto?')) {
      this.store.dispatch(ProductActions.deleteProduct({ id }));
    }
  }

  create() {
    this.router.navigate(['/create']);
  }
}