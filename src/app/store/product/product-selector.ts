import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product-reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  state => state.products
);
export const selectSelectedProduct = createSelector(
  selectProductState,
  state => state.selectedProduct
);
export const selectProductError = createSelector(
  selectProductState,
  state => state.error
);
export const selectProductLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);