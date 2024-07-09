import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { PipeDefinition, PipeDefinitionCreate, PipeDefinitionSearchParams } from "src/app/models/pipe.model";

export const pipeDefinitionsKey = '[Pipe Definitions]';

// Get actions
export const actionGetPipeDefinitions = createAction(
    `${pipeDefinitionsKey} Get Pipe Definitions`,
    props<{ searchParams: PipeDefinitionSearchParams | null }>()
);
export const actionGetPipeDefinitionsSuccess = createAction(
    `${pipeDefinitionsKey} Get Pipe Definitions Success`,
    props<{ pipeDefinitions: PipeDefinition[] }>() 
);
export const actionGetPipeDefinitionsError = createAction(
    `${pipeDefinitionsKey} Get Pipe Definitions Failure`,
    props<{ errorLoadingPipeDefinitions: HttpErrorResponse }>()
);

// Create actions
export const actionCreatePipeDefinition = createAction(
    `${pipeDefinitionsKey} Create Pipe Definition`,
    props<{ pipeDefinitionCreate: PipeDefinitionCreate }>()
);
export const actionCreatePipeDefinitionSuccess = createAction(
    `${pipeDefinitionsKey} Create Pipe Definition Success`,
    props<{ pipeDefinition: PipeDefinition }>()
);
export const actionCreatePipeDefinitionError = createAction(
    `${pipeDefinitionsKey} Create Pipe Definition Error`,
    props<{ errorCreatingPipeDefinition: HttpErrorResponse }>()
);

// Update actions
export const actionUpdatePipeDefinition = createAction(
    `${pipeDefinitionsKey} Update Pipe Definition`,
    props<{ id: string; pipeDefinition: PipeDefinition }>()
);
export const actionUpdatePipeDefinitionSuccess = createAction(
    `${pipeDefinitionsKey} Update Pipe Definition Success`,
    props<{ id: string; pipeDefinition: PipeDefinition }>()
);
export const actionUpdatePipeDefinitionError = createAction(
    `${pipeDefinitionsKey} Update Pipe Definition Error`,
    props<{ errorUpdatingPipeDefinition: HttpErrorResponse }>()
);

// Reset notifications
export const resetPipeDefinitionNotifications = createAction(
    `${pipeDefinitionsKey} Reset Pipe Definition Notifications`
);
