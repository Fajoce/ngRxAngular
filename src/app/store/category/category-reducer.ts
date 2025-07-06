import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from '../../store/category/category-action';
import { Category } from '../../models/category';

export interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  error: string | null;
  loading: boolean;
}

export const initialState: CategoryState = {
  categories: [],
   selectedCategory: null,
  error: null,
  loading: false  
};

export const categoriesReducer = createReducer(
  initialState,

  // Cargar categories
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => ({ ...state, categories, loading: false })),
  on(CategoryActions.loadCategoriesFailure, (state, { error }) => ({ ...state, error,loading: false })),
  on(CategoryActions.loadCategoryByIdSuccess, (state, { category }) => ({
  ...state,
  selectedCategory: category
})),
on(CategoryActions.loadCategoryByIdSuccess, (state, { category }) => ({ ...state, selectedCategory: category })),
  on(CategoryActions.loadCategoryByIdFailure, (state, { error }) => ({ ...state, error })),

  // Crear, actualizar, eliminar → recarga de productos opcional en efecto
  on(CategoryActions.createCategoryFailure, (state, { error }) => ({ ...state, error })),
  on(CategoryActions.updateCategoryFailure, (state, { error }) => ({ ...state, error })),
  on(CategoryActions.deleteCategoryFailure, (state, { error }) => ({ ...state, error })),
);