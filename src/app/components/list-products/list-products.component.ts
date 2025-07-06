import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import * as ProductActions from '../../store/product/product-action';
import * as fromProduct from '../../store/product/product-selector';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
})
export class ListProductsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  error$: Observable<string | null>;
  showFilter = false;
  loading$!: Observable<boolean>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store, private router: Router) {
    this.error$ = this.store.select(fromProduct.selectProductError);
    this.loading$ = this.store.select(fromProduct.selectProductLoading);
    this.loading$.subscribe(value => console.log('loading state:', value));
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());

    this.store.select(fromProduct.selectAllProducts).subscribe((products) => {
      this.dataSource.data = products;
      this.dataSource.paginator = this.paginator;
    });
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
