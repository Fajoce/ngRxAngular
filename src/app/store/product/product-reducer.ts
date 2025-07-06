import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../store/../product/product-action';
import { Product } from '../../models/product';

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  error: string | null;
  loading: boolean;
}

export const initialState: ProductState = {
  products: [],
   selectedProduct: null,
  error: null,
  loading: false  
};

export const productReducer = createReducer(
  initialState,

  // Cargar productos
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({ ...state, products, loading: false })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({ ...state, error,loading: false })),
  on(ProductActions.loadProductByIdSuccess, (state, { product }) => ({
  ...state,
  selectedProduct: product
})),
on(ProductActions.loadProductByIdSuccess, (state, { product }) => ({ ...state, selectedProduct: product })),
  on(ProductActions.loadProductByIdFailure, (state, { error }) => ({ ...state, error })),

  // Crear, actualizar, eliminar → recarga de productos opcional en efecto
  on(ProductActions.createProductFailure, (state, { error }) => ({ ...state, error })),
  on(ProductActions.updateProductFailure, (state, { error }) => ({ ...state, error })),
  on(ProductActions.deleteProductFailure, (state, { error }) => ({ ...state, error })),
);