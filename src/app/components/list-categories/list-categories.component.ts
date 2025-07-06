import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import * as CategoryActions from '../../store/category/category-action';
import * as fromCategory from '../../store/category/category-selector';
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
  selector: 'app-list-categories',
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
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.css'
})
export class ListCategoriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Category>();
  error$: Observable<string | null>;
  showFilter = false;
  loading$!: Observable<boolean>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store, private router: Router) {
    this.error$ = this.store.select(fromCategory.selectCategoryError);
    this.loading$ = this.store.select(fromCategory.selectCategoryLoading);
    this.loading$.subscribe(value => console.log('loading state:', value));
  }

  ngOnInit(): void {
    this.store.dispatch(CategoryActions.loadCategories());

    this.store.select(fromCategory.selectAllCategories).subscribe((categories) => {
      this.dataSource.data = categories;
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

  edit(catg: Category) {
    this.router.navigate(['/edit', catg.id]);
  }

  remove(id: number) {
    if (confirm('¿Deseas eliminar esta categoria?')) {
      this.store.dispatch(CategoryActions.deleteCategory({ id }));
    }
  }
  create() {
    this.router.navigate(['/categories']);
  }
}
