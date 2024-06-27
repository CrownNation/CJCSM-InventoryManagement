import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { PipeProperties } from "src/app/models/pipe.model";

export const pipePropertiesKey = '[Pipe Properties]';

// Get all pipe properties actions
export const actionGetAllPipeProperties = createAction(
    `${pipePropertiesKey} Get All Pipe Properties`
);
export const actionGetAllPipePropertiesSuccess = createAction(
    `${pipePropertiesKey} Get All Pipe Properties Success`,
    props<{ pipeProperties: PipeProperties }>()
);
export const actionGetAllPipePropertiesError = createAction(
    `${pipePropertiesKey} Get All Pipe Properties Failure`,
    props<{ errorLoadingProperties: HttpErrorResponse }>()
);

// Reset notifications action
export const resetPipePropertiesNotifications = createAction(
    `${pipePropertiesKey} Reset Pipe Properties Notifications`
);
