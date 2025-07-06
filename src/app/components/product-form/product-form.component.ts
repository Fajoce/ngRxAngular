import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, filter, takeUntil, tap } from 'rxjs';
import { SpinnerServiceService } from '../../services/spinner-service.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 

import { Product } from '../../models/product';
import * as ProductActions from '../../store/product/product-action';
import { selectSelectedProduct } from '../../store/product/product-selector';
import { Category } from '../../models/category';
import { CategoryServiceService } from '../../services/category-service.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule
  ],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private spinnerService = inject(SpinnerServiceService);
  private categoryservice = inject(CategoryServiceService)

  form: FormGroup;
  productId: number | null = null;
  private destroy$ = new Subject<void>();
  categories: Category[] = [];

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    // Cargar categorías
    this.categoryservice.getAll().subscribe({
      next: (cats) => (this.categories = cats),
      error: (err) => console.error('Error al cargar categorías', err),
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id;
      this.store.dispatch(
        ProductActions.loadProductById({ id: this.productId })
      );

      this.store
        .pipe(
          select(selectSelectedProduct),
          filter((p) => !!p),
          takeUntil(this.destroy$),
          tap((product) => {
            this.form.patchValue(product!);
          })
        )
        .subscribe();
    }
  }

  onSubmit(): void {
    const product: Product = {
      ...this.form.value,
      id: this.productId ?? 0,
    };

    if (this.productId) {
      this.store.dispatch(ProductActions.updateProduct({ product }));
      // this.toastr.success('Producto actualizado exitosamente', 'Éxito');
    } else {
      this.store.dispatch(ProductActions.createProduct({ product }));
      //this.toastr.success('Producto creado exitosamente', 'Éxito');
    }
    setTimeout(() => {
      this.spinnerService.hide();
      this.router.navigate(['/']);
    }, 800);
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
