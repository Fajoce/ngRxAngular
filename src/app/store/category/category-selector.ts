import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from './category-reducer';

export const selectCategoryState = createFeatureSelector<CategoryState>('categories');

export const selectAllCategories = createSelector(
  selectCategoryState,
  state => state.categories
);
export const selectSelectedCategory = createSelector(
  selectCategoryState,
  state => state.selectedCategory
);
export const selectCategoryError = createSelector(
  selectCategoryState,
  state => state.error
);
export const selectCategoryLoading = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.loading
);