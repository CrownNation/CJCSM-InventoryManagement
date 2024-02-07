import { ActionReducer, createReducer, on } from "@ngrx/store";
import { PipeProperty_CategoryState } from "./pipe-property-category.state";
import { PipeProperty_Category } from "src/app/models/pipe.model";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { actionGetCategories, actionGetCategoriesError, actionGetCategoriesSuccess } from "./pipe-property-category.actions";


export function sortByName(a: PipeProperty_Category, b: PipeProperty_Category): number {
    return a.name.localeCompare(b.name);
  }

// export const selectId= ({ pipeProperty_CategoryId }: PipeProperty_Category) => pipeProperty_CategoryId;

// export const selectId = ({ pipeProperty_CategoryId }: PipeProperty_Category): string => pipeProperty_CategoryId;

// selectId is of type 'function', and that function takes one parameter.
// That function returns a string. This string is the pipeProperty_CategoryId of the object passed in as the parameter.
 export const selectId: (category: PipeProperty_Category) => string = (category: PipeProperty_Category) => category.pipeProperty_CategoryId;

//This can be done this way:
// export const selectId = ({ pipeProperty_CategoryId }: PipeProperty_Category): string => pipeProperty_CategoryId;
// This uses destructure syntax to get the pipeProperty_CategoryId from the object passed in as the parameter. { pipeProperty_CategoryId }: PipeProperty_Category
// (): string. This defines the return type of the function.
// => Is the implementation of the function. It returns the pipeProperty_CategoryId of the object passed in as the parameter.


export const pipeProperty_CategoryAdapter: EntityAdapter<PipeProperty_Category> = createEntityAdapter<PipeProperty_Category>({
    sortComparer: sortByName,
    selectId: selectId
});

export const initialState: PipeProperty_CategoryState = pipeProperty_CategoryAdapter.getInitialState({
    ids: [],
    entities: { },
    loadingCategories: false,
    errorLoadingCategories: null,

    creatingCategory: false,
    createdCategory: null,
    errorCreatingCategory: null,

    selectedCategory: null,
    errorLoadingSelectedCategory: null
});


const reducer: ActionReducer<PipeProperty_CategoryState> = createReducer(
    initialState,
    // Retrieve Pipe Property Categories
    on(actionGetCategories, (state: PipeProperty_CategoryState, { }) => {
        const newState = pipeProperty_CategoryAdapter.removeAll(state); // Needed so it refreshes the subscription fires with new data
        return {
          ...newState,
          loadingCategories: true,
          errorLoadingCategories: null
        };
    }),
    on(actionGetCategoriesSuccess, (state: PipeProperty_CategoryState, { categories }) => {
        return pipeProperty_CategoryAdapter.addMany(categories, {
          ...state,
          loadingCategories: false,
          errorLoadingCategories: null
        });
    }),
    on(actionGetCategoriesError, (state: PipeProperty_CategoryState, { errorLoadingCategories }) => ({
        ...state,
        loadingCategories: false,
        errorLoadingCategories
    }))

);