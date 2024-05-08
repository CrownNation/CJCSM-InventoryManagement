import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { PipeProperty_Size, PipeProperty_SizeCreate, PipeProperty_SizeSearchParams } from "src/app/models/pipe.model";

export const sizesKey = '[Pipe Properties Size]';

// Get actions
export const actionGetSizes = createAction(
    `${sizesKey} Get Sizes`,
    props<{ searchParams: PipeProperty_SizeSearchParams | null }>()
);
export const actionGetSizesSuccess = createAction(
    `${sizesKey} Get Sizes Success`,
    props<{ sizes: PipeProperty_Size[] }>()
);
export const actionGetSizesError = createAction(
    `${sizesKey} Get Sizes Failure`,
    props<{ errorLoadingSizes: HttpErrorResponse }>()
);

// Create actions
export const actionCreatePipeProperty_Size = createAction(
    `${sizesKey} Create PipeProperty_Size`,
    props<{ sizeCreate: PipeProperty_SizeCreate }>()
);
export const actionCreatePipeProperty_SizeSuccess = createAction(
    `${sizesKey} Create PipeProperty_Size Success`,
    props<{ size: PipeProperty_Size }>()
);
export const actionCreatePipeProperty_SizeError = createAction(
    `${sizesKey} Create PipeProperty_Size Error`,
    props<{ errorCreatingSize: HttpErrorResponse }>()
);

// Update actions
export const actionUpdatePipeProperty_Size = createAction(
    `${sizesKey} Update PipeProperty_Size`,
    props<{ id: string; size: PipeProperty_Size }>()
);
export const actionUpdatePipeProperty_SizeSuccess = createAction(
    `${sizesKey} Update PipeProperty_Size Success`,
    props<{ id: string; size: PipeProperty_Size }>()
);
export const actionUpdatePipeProperty_SizeError = createAction(
    `${sizesKey} Update PipeProperty_Size Error`,
    props<{ errorUpdatingSize: HttpErrorResponse }>()
);

// Reset notifications
export const resetSizeNotifications = createAction(`${sizesKey} Reset Size Notifications`);
