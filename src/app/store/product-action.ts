import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product';
import { ResponseProduct } from '../models/response-product';

// Cargar todos
export const loadProducts = createAction('[Product] Load All');
export const loadProductsSuccess = createAction('[Product] Load All Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Product] Load All Failure', props<{ error: string }>());
// ver por Id
export const loadProductById = createAction('[Product] Load By Id', props<{ id: number }>());
export const loadProductByIdSuccess = createAction('[Product] Load By Id Success', props<{ product: Product }>());
export const loadProductByIdFailure = createAction('[Product] Load By Id Failure', props<{ error: string }>());

// Crear
export const createProduct = createAction('[Product] Create', props<{ product: Product }>());
export const createProductSuccess = createAction('[Product] Create Success', props<{ response: ResponseProduct }>());
export const createProductFailure = createAction('[Product] Create Failure', props<{ error: string }>());

// Actualizar
export const updateProduct = createAction('[Product] Update', props<{ product: Product }>());
export const updateProductSuccess = createAction('[Product] Update Success', props<{ response: ResponseProduct }>());
export const updateProductFailure = createAction('[Product] Update Failure', props<{ error: string }>());

// Eliminar
export const deleteProduct = createAction('[Product] Delete', props<{ id: number }>());
export const deleteProductSuccess = createAction('[Product] Delete Success', props<{ response: ResponseProduct }>());
export const deleteProductFailure = createAction('[Product] Delete Failure', props<{ error: string }>());
