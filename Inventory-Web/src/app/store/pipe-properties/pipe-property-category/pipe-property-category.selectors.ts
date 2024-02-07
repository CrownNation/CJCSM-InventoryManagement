import { pipeProperty_CategoryAdapter } from "./pipe-property-category.reducers";
import { PipeProperty_CategoryState } from "./pipe-property-category.state";
import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../core.state";


// getSelectors returns 4 default selectors, selectIds, selectEntities, selectAll, and selectTotal
// Here we are only interested in selectEntities and selectAll, so we destructure them from the result of getSelectors
const { selectEntities, selectAll } = pipeProperty_CategoryAdapter.getSelectors();

export const selectCategoryFeature: MemoizedSelector<AppState, PipeProperty_CategoryState> =
  createFeatureSelector<PipeProperty_CategoryState>('pipePropertyCategory');

export const selectCategoryState = createSelector(
    selectCategoryFeature,
    (state: PipeProperty_CategoryState) => state
);

// Gets array of all data objects
export const selectAllCategories = createSelector(selectCategoryFeature, selectAll);

// Gets dictionary of all data objects
export const selectAllCategoryEntities = createSelector(selectCategoryFeature, selectEntities);


// Retrieve flag for if data is being loaded
export const selectLoadingCategories = createSelector(
    selectCategoryFeature,
    (state: PipeProperty_CategoryState) => state.loadingCategories
);

// Retrieve error message for if data fails to load
export const selectErrorLoadingCategories = createSelector(
    selectCategoryFeature,
    (state: PipeProperty_CategoryState) => state.errorCreatingCategory
);

// Retrieve flag for if data is currently being loaded
export const selectCreatingCategory = createSelector(
  selectCategoryFeature,
  (state: PipeProperty_CategoryState) => state.creatingCategory
);

// Retrieve created data object
export const selectCreatedCategory = createSelector(
  selectCategoryFeature,
  (state: PipeProperty_CategoryState) => state.createdCategory
);

// Retrieve error message for if data fails to create
export const selectCreatingCategoryError = createSelector(
  selectCategoryFeature,
  (state: PipeProperty_CategoryState) => state.errorCreatingCategory
);

// Retrieve selected object
export const selectSelectedCategory = createSelector(
    selectCategoryFeature,
    (state: PipeProperty_CategoryState) => state.selectedCategory
  );

// Error message for if selected object fails to load
export const selectSelectedCategoryError = createSelector(
    selectCategoryFeature,
    (state: PipeProperty_CategoryState) => state.errorLoadingSelectedCategory
);
