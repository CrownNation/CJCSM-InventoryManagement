
import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { PipeProperty_Range, PipeProperty_RangeCreate, PipeProperty_RangeSearchParams } from "src/app/models/pipe.model";

export const rangesKey = '[Pipe Properties Range]';

// Get actions
export const actionGetRanges = createAction(
    `${rangesKey} Get Ranges`,
    props<{ searchParams: PipeProperty_RangeSearchParams | null }>()
);
export const actionGetRangesSuccess = createAction(
    `${rangesKey} Get Ranges Success`,
    props<{ ranges: PipeProperty_Range[] }>()
);
export const actionGetRangesError = createAction(
    `${rangesKey} Get Ranges Failure`,
    props<{ errorLoadingRanges: HttpErrorResponse }>()
);

// Create actions
export const actionCreatePipeProperty_Range = createAction(
    `${rangesKey} Create PipeProperty_Range`,
    props<{ rangeCreate: PipeProperty_RangeCreate }>()
);
export const actionCreatePipeProperty_RangeSuccess = createAction(
    `${rangesKey} Create PipeProperty_Range Success`,
    props<{ range: PipeProperty_Range }>()
);
export const actionCreatePipeProperty_RangeError = createAction(
    `${rangesKey} Create PipeProperty_Range Error`,
    props<{ errorCreatingRange: HttpErrorResponse }>()
);

// Update actions
export const actionUpdatePipeProperty_Range = createAction(
    `${rangesKey} Update PipeProperty_Range`,
    props<{ id: string; range: PipeProperty_Range }>()
);
export const actionUpdatePipeProperty_RangeSuccess = createAction(
    `${rangesKey} Update PipeProperty_Range Success`,
    props<{ id: string; range: PipeProperty_Range }>()
);
export const actionUpdatePipeProperty_RangeError = createAction(
    `${rangesKey} Update PipeProperty_Range Error`,
    props<{ errorUpdatingRange: HttpErrorResponse }>()
);

// Reset notifications
export const resetRangeNotifications = createAction(`${rangesKey} Reset Range Notifications`);
