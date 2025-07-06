import { inject,Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductServiceService } from '../../services/product-service.service';
import * as ProductActions from '../store/../product/product-action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductServiceService);
  private toastr = inject(ToastrService);


  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getAll().pipe(
          map(products => ProductActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductActions.loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

loadProductById$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductActions.loadProductById),
    mergeMap(action =>
      this.productService.getById(action.id).pipe(
        map(product => ProductActions.loadProductByIdSuccess({ product })),
        catchError(error => of(ProductActions.loadProductByIdFailure({ error: error.message })))
      )
    )
  )
);

createProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductActions.createProduct),
    mergeMap(action =>
      this.productService.create(action.product).pipe(
        map(response => {
          this.toastr.success('Producto creado exitosamente', 'Éxito'); // 🎯 Aquí sí fue exitoso
          return ProductActions.createProductSuccess({ response });
        }),
        catchError(error => of(ProductActions.createProductFailure({ error: error.message })))
      )
    )
  )
);
  reloadAfterCreate$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductActions.createProductSuccess),
    map(() => ProductActions.loadProducts()) // 👈 recarga lista
  )
);

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(action =>
        this.productService.update(action.product).pipe(
          map(response => ProductActions.updateProductSuccess({ response })),
          catchError(error => of(ProductActions.updateProductFailure({ error: error.message })))
        )
      )
    )
  );
  reloadAfterUpdate$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProductActions.updateProductSuccess),
    map(() => ProductActions.loadProducts()) // 👈 recarga lista
  )
);

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(action =>
        this.productService.delete(action.id).pipe(
          map(response => ProductActions.deleteProductSuccess({ response })),
          catchError(error => of(ProductActions.deleteProductFailure({ error: error.message })))
        )
      )
    )
  );
}