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
import { CategoryServiceService } from '../../services/category-service.service';

import { Category } from '../../models/category';
import * as CategoryActions from '../../store/category/category-action';
import { selectSelectedCategory } from '../../store/category/category-selector';

@Component({
  selector: 'app-category-form',
  imports: [
     CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private spinnerService = inject(SpinnerServiceService);
  private serviceCategory = inject(CategoryServiceService);

  form: FormGroup;
  categoryId: number | null = null;
  private destroy$ = new Subject<void>();

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryId = +id;
      this.store.dispatch(
        CategoryActions.loadCategoryById({ id: this.categoryId })
      );

      this.store
        .pipe(
          select(selectSelectedCategory),
          filter((p) => !!p),
          takeUntil(this.destroy$),
          tap((category) => {
            this.form.patchValue(category!);
          })
        )
        .subscribe();
    }
  }

  onSubmit(): void {
    const category: Category = {
      ...this.form.value,
      id: this.categoryId ?? 0,
    };

    if (this.categoryId) {
      this.store.dispatch(CategoryActions.updateCategory({ category }));
      // this.toastr.success('Producto actualizado exitosamente', 'Éxito');
    } else {
      this.store.dispatch(CategoryActions.createCategory({ category }));
      //this.toastr.success('Producto creado exitosamente', 'Éxito');
    }
    setTimeout(() => {
      this.spinnerService.hide();
      this.router.navigate(['/']);
    }, 800);
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/list-category']);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
