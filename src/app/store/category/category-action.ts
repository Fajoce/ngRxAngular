import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/category';
import { ResponseCategory } from '../../models/response-category';

// Cargar todos
export const loadCategories = createAction('[Category] Load All');
export const loadCategoriesSuccess = createAction('[Category] Load All Success', props<{ categories: Category[] }>());
export const loadCategoriesFailure = createAction('[Category] Load All Failure', props<{ error: string }>());
// ver por Id
export const loadCategoryById = createAction('[Category] Load By Id', props<{ id: number }>());
export const loadCategoryByIdSuccess = createAction('[Category] Load By Id Success', props<{ category: Category }>());
export const loadCategoryByIdFailure = createAction('[Category] Load By Id Failure', props<{ error: string }>());

// Crear
export const createCategory = createAction('[Category] Create', props<{ category: Category }>());
export const createCategorySuccess = createAction('[Category] Create Success', props<{ response: ResponseCategory }>());
export const createCategoryFailure = createAction('[Category] Create Failure', props<{ error: string }>());

// Actualizar
export const updateCategory = createAction('[Category] Update', props<{ category: Category }>());
export const updateCategorySuccess = createAction('[Category] Update Success', props<{ response: ResponseCategory }>());
export const updateCategoryFailure = createAction('[Category] Update Failure', props<{ error: string }>());

// Eliminar
export const deleteCategory = createAction('[Category] Delete', props<{ id: number }>());
export const deleteCategorySuccess = createAction('[Category] Delete Success', props<{ response: ResponseCategory }>());
export const deleteCategoryFailure = createAction('[Category] Delete Failure', props<{ error: string }>());
