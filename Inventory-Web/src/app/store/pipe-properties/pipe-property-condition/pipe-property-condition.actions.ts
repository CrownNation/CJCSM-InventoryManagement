import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { PipeProperty_Condition, PipeProperty_ConditionCreate, PipeProperty_ConditionSearchParams } from "src/app/models/pipe.model";

export const conditionsKey = '[Pipe Properties Condition]';

// Get actions
export const actionGetConditions = createAction(
    `${conditionsKey} Get Conditions`,
    props<{ searchParams: PipeProperty_ConditionSearchParams | null}>()
);
export const actionGetConditionsSuccess = createAction(
    `${conditionsKey} Get Conditions Success`,
    props<{ conditions: PipeProperty_Condition[] }>() 
);
export const actionGetConditionsError = createAction(
    `${conditionsKey} Get Conditions Failure`,
    props<{ errorLoadingConditions: HttpErrorResponse }>()
);

// Create actions
export const actionCreatePipeProperty_Condition = createAction(
    `${conditionsKey} Create PipeProperty_Condition`,
    props<{ conditionCreate: PipeProperty_ConditionCreate }>()
);
export const actionCreatePipeProperty_ConditionSuccess = createAction(
    `${conditionsKey} Create PipeProperty_Condition Success`,
    props<{ condition: PipeProperty_Condition }>()
);
export const actionCreatePipeProperty_ConditionError = createAction(
    `${conditionsKey} Create PipeProperty_Condition Error`,
    props<{ errorCreatingCondition: HttpErrorResponse }>()
);

// Update actions
export const actionUpdatePipeProperty_Condition = createAction(
    `${conditionsKey} Update PipeProperty_Condition`,
    props<{ id: string; condition: PipeProperty_Condition }>()
);

export const actionUpdatePipeProperty_ConditionSuccess = createAction(
    `${conditionsKey} Update PipeProperty_Condition Success`,
    props<{ id: string; condition: PipeProperty_Condition }>()
);

export const actionUpdatePipeProperty_ConditionError = createAction(
    `${conditionsKey} Update PipeProperty_Condition Error`,
    props<{ error: HttpErrorResponse }>()
);
