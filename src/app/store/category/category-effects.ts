import { inject,Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryServiceService } from '../../services/category-service.service';
import * as CategoryActions from '../../store/category/category-action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CategoryEffects {
  private actions$ = inject(Actions);
  private categoryService = inject(CategoryServiceService);
  private toastr = inject(ToastrService);


  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadCategories),
      mergeMap(() =>
        this.categoryService.getAll().pipe(
          map(categories => CategoryActions.loadCategoriesSuccess({ categories })),
          catchError(error => of(CategoryActions.loadCategoriesFailure({ error: error.message })))
        )
      )
    )
  );

loadProductById$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CategoryActions.loadCategoryById),
    mergeMap(action =>
      this.categoryService.getById(action.id).pipe(
        map(category => CategoryActions.loadCategoryByIdSuccess({ category })),
        catchError(error => of(CategoryActions.loadCategoryByIdFailure({ error: error.message })))
      )
    )
  )
);

createProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CategoryActions.createCategory),
    mergeMap(action =>
      this.categoryService.create(action.category).pipe(
        map(response => {
          this.toastr.success('Categoria creada exitosamente', 'Éxito'); 
          return CategoryActions.createCategorySuccess({ response });
        }),
        catchError(error => of(CategoryActions.createCategoryFailure({ error: error.message })))
      )
    )
  )
);
  reloadAfterCreate$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CategoryActions.createCategorySuccess),
    map(() => CategoryActions.loadCategories()) 
  )
);

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.updateCategory),
      mergeMap(action =>
        this.categoryService.update(action.category).pipe(
          map(response => CategoryActions.updateCategorySuccess({ response })),
          catchError(error => of(CategoryActions.updateCategoryFailure({ error: error.message })))
        )
      )
    )
  );
  reloadAfterUpdate$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CategoryActions.updateCategorySuccess),
    map(() => CategoryActions.loadCategories()) 
  )
);

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.deleteCategory),
      mergeMap(action =>
        this.categoryService.delete(action.id).pipe(
          map(response => CategoryActions.deleteCategorySuccess({ response })),
          catchError(error => of(CategoryActions.deleteCategoryFailure({ error: error.message })))
        )
      )
    )
  );
}
