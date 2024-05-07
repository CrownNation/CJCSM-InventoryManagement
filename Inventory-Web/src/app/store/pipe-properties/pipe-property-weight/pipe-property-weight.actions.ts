import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { PipeProperty_Weight, PipeProperty_WeightCreate, PipeProperty_WeightSearchParams } from "src/app/models/pipe.model";

export const weightsKey = '[Pipe Properties Weight]';

// Get actions
export const actionGetWeights = createAction(
    `${weightsKey} Get Weights`,
    props<{ searchParams: PipeProperty_WeightSearchParams | null }>()
);
export const actionGetWeightsSuccess = createAction(
    `${weightsKey} Get Weights Success`,
    props<{ weights: PipeProperty_Weight[] }>()
);
export const actionGetWeightsError = createAction(
    `${weightsKey} Get Weights Failure`,
    props<{ errorLoadingWeights: HttpErrorResponse }>()
);

// Create actions
export const actionCreatePipeProperty_Weight = createAction(
    `${weightsKey} Create PipeProperty_Weight`,
    props<{ weightCreate: PipeProperty_WeightCreate }>()
);
export const actionCreatePipeProperty_WeightSuccess = createAction(
    `${weightsKey} Create PipeProperty_Weight Success`,
    props<{ weight: PipeProperty_Weight }>()
);
export const actionCreatePipeProperty_WeightError = createAction(
    `${weightsKey} Create PipeProperty_Weight Error`,
    props<{ errorCreatingWeight: HttpErrorResponse }>()
);

// Update actions
export const actionUpdatePipeProperty_Weight = createAction(
    `${weightsKey} Update PipeProperty_Weight`,
    props<{ id: string; weight: PipeProperty_Weight }>()
);
export const actionUpdatePipeProperty_WeightSuccess = createAction(
    `${weightsKey} Update PipeProperty_Weight Success`,
    props<{ id: string; weight: PipeProperty_Weight }>()
);
export const actionUpdatePipeProperty_WeightError = createAction(
    `${weightsKey} Update PipeProperty_Weight Error`,
    props<{ errorUpdatingWeight: HttpErrorResponse }>()
);

// Reset notifications
export const resetWeightNotifications = createAction(`${weightsKey} Reset Weight Notifications`);
