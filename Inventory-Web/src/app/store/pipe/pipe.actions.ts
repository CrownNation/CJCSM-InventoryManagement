import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Pipe, PipeCreate, PipeDefinition, PipeDefinitionSearchParams, PipeSearchParams } from '../../models/pipe.model';

export const pipeKey = '[Pipe]';

// Get Pipe
export const actionGetPipe = createAction(
    `${pipeKey} Get Pipe`,
    props<{ searchParams: PipeSearchParams | null}>()
);
export const actionGetPipeSuccess = createAction(
    `${pipeKey} Get Pipe Success`,
    props<{ pipe: Pipe[] }>()
);
export const actionGetPipeError = createAction(
    `${pipeKey} Get Pipe Error`,
    props<{ errorLoadingPipe: HttpErrorResponse }>()
);

// Create Pipe
export const actionCreatePipe = createAction(
    `${pipeKey} Create Pipe`,
    props<{ pipeCreate: PipeCreate }>()
);
export const actionCreatePipeSuccess = createAction(
    `${pipeKey} Create Pipe Success`,
    props<{ pipe: Pipe }>()
);
export const actionCreatePipeError = createAction(
    `${pipeKey} Create Pipe Error`,
    props<{ errorCreatingPipe: HttpErrorResponse }>()
);

// Get Pipe by Id
export const actionGetPipeById = createAction(
    `${pipeKey} Get Pipe By Id`,
    props<{ pipeId: string }>()
);
export const actionGetPipeByIdSuccess = createAction(
    `${pipeKey} Get Pipe By Id Success`,
    props<{ selectedPipe: Pipe }>()
);
export const actionGetPipeByIdError = createAction(
    `${pipeKey} Get Pipe By Id Error`,
    props<{ errorLoadingSelectedPipe: HttpErrorResponse }>()
);

// Get Full Pipe List
export const actionGetPipeDefinitionsList = createAction(
    `${pipeKey} Get Pipe Definitions List`,
    props<{ searchParams: PipeDefinitionSearchParams | null}>()
);
export const actionGetPipeDefinitionsListSuccess = createAction(
    `${pipeKey} Get Pipe Definitions List Success`,
    props<{ pipeDefinitionsList: PipeDefinition[] | null}>()
);
export const actionGetPipeDefinitionsListError = createAction(
    `${pipeKey} Get Pipe Definitions List Error`,
    props<{ errorLoadingPipeDefinitionsList: HttpErrorResponse }>()
);
