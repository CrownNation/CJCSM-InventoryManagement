import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { PipeProperty_CategoryState } from "./pipe-property-category.state";
import { PipeProperty_Category } from "src/app/models/pipe.model";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import {
  actionCreatePipeProperty_Category,
  actionCreatePipeProperty_CategorySuccess,
  actionCreatePipeProperty_CategoryError,
  actionGetCategories,
  actionGetCategoriesSuccess,
  actionGetCategoriesError,
  actionUpdatePipeProperty_Category,
  actionUpdatePipeProperty_CategorySuccess,
  actionUpdatePipeProperty_CategoryError,
  resetCategoryNotifications
} from "./pipe-property-category.actions";

export function sortByName(a: PipeProperty_Category, b: PipeProperty_Category): number {
    return a.name.localeCompare(b.name);
}

export const selectId: (category: PipeProperty_Category) => string = (category: PipeProperty_Category) => category.pipeProperty_CategoryId;

export const pipeProperty_CategoryAdapter: EntityAdapter<PipeProperty_Category> = createEntityAdapter<PipeProperty_Category>({
    sortComparer: sortByName,
    selectId: selectId
});

export const initialState: PipeProperty_CategoryState = pipeProperty_CategoryAdapter.getInitialState({
    ids: [],
    entities: {},
    loadingCategories: false,
    errorLoadingCategories: null,
    creatingCategory: false,
    createdCategory: null,
    errorCreatingCategory: null,
    updatingCategory: false,
    updatedCategory: null,
    errorUpdatingCategory: null,
    selectedCategory: null,
    errorLoadingSelectedCategory: null
});

const reducer: ActionReducer<PipeProperty_CategoryState> = createReducer(
    initialState,
    // Get categories
    on(actionGetCategories, (state) => ({
        ...state,
        loadingCategories: true,
        errorLoadingCategories: null
    })),
    on(actionGetCategoriesSuccess, (state, { categories }) =>
        pipeProperty_CategoryAdapter.addMany(categories, {
            ...state,
            loadingCategories: false,
            errorLoadingCategories: null
        })
    ),
    on(actionGetCategoriesError, (state, { errorLoadingCategories }) => ({
        ...state,
        loadingCategories: false,
        errorLoadingCategories
    })),

    // Create category
    on(actionCreatePipeProperty_Category, (state) => ({
        ...state,
        creatingCategory: true,
        createdCategory: null,
        errorCreatingCategory: null
    })),
    on(actionCreatePipeProperty_CategorySuccess, (state, { category }) =>
        pipeProperty_CategoryAdapter.addOne(category, {
            ...state,
            creatingCategory: false,
            createdCategory: category,
            errorCreatingCategory: null
        })
    ),
    on(actionCreatePipeProperty_CategoryError, (state, { errorCreatingCategory }) => ({
        ...state,
        creatingCategory: false,
        errorCreatingCategory
    })),

    // Update category
    on(actionUpdatePipeProperty_Category, (state) => ({
        ...state,
        updatingCategory: true,
        updatedCategory: null,
        errorUpdatingCategory: null
    })),
    on(actionUpdatePipeProperty_CategorySuccess, (state, { category }) =>
        pipeProperty_CategoryAdapter.updateOne({
            id: category.pipeProperty_CategoryId,
            changes: category
        }, {
            ...state,
            updatingCategory: false,
            updatedCategory: category,
            errorUpdatingCategory: null
        })
    ),
    on(actionUpdatePipeProperty_CategoryError, (state, { errorUpdatingCategory }) => ({
        ...state,
        updatingCategory: false,
        errorUpdatingCategory
    })),

    // Reset notifications
    on(resetCategoryNotifications, (state) => ({
        ...state,
        createdCategory: null,
        updatedCategory: null,
        errorLoadingCategories: null,
        errorCreatingCategory: null,
        errorUpdatingCategory: null
    }))
);

export function pipeProperty_CategoryReducers(state: PipeProperty_CategoryState | undefined, action: Action) {
    return reducer(state, action);
}
