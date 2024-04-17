import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { PipeProperty_Category, PipeProperty_CategoryCreate, PipeProperty_CategorySearchParams } from "src/app/models/pipe.model";

export const categoriesKey = '[Pipe Properties Category]';

// Get actions
export const actionGetCategories = createAction(
    `${categoriesKey} Get Categories`,
    props<{ searchParams: PipeProperty_CategorySearchParams | null}>()
);
export const actionGetCategoriesSuccess = createAction(
    `${categoriesKey} Get Categories Success`,
    props<{ categories: PipeProperty_Category[] }>() 
);
export const actionGetCategoriesError = createAction(
    `${categoriesKey} Get Categories Failure`,
    props<{ errorLoadingCategories: HttpErrorResponse }>()
);

// Create actions
export const actionCreatePipeProperty_Category = createAction(
    `${categoriesKey} Create PipeProperty_Cateogry`,
    props<{ categoryCreate: PipeProperty_CategoryCreate }>()
);
export const actionCreatePipeProperty_CategorySuccess = createAction(
    `${categoriesKey} Create PipeProperty_Cateogry Success`,
    props<{ category: PipeProperty_Category }>()
);
export const actionCreatePipeProperty_CategoryError = createAction(
    `${categoriesKey} Create PipeProperty_Cateogry Error`,
    props<{ errorCreatingCategory: HttpErrorResponse }>()
);

// Update actions
export const actionUpdatePipeProperty_Category = createAction(
    `${categoriesKey} Update PipeProperty_Category`,
    props<{ id: string; category: PipeProperty_Category }>()
);

export const actionUpdatePipeProperty_CategorySuccess = createAction(
    `${categoriesKey} Update PipeProperty_Category Success`,
    props<{ id: string; category: PipeProperty_Category }>()
);

export const actionUpdatePipeProperty_CategoryError = createAction(
    `${categoriesKey} Update PipeProperty_Category Error`,
    props<{ error: HttpErrorResponse }>()
);

//Reset notifcations
export const resetCategoryNotifications = createAction(`${categoriesKey} Reset Category Notifications`);
