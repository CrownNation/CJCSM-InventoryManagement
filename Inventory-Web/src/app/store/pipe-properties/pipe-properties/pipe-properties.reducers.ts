import { Action, createReducer, on } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { actionGetAllPipeProperties, actionGetAllPipePropertiesSuccess, actionGetAllPipePropertiesError, resetPipePropertiesNotifications } from './pipe-properties.actions';
import { PipeProperties } from "src/app/models/pipe.model";

export interface PipePropertiesState {
    pipeProperties: PipeProperties | null;
    loadingProperties: boolean;
    errorLoadingProperties: HttpErrorResponse | null;
}

export const initialState: PipePropertiesState = {
    pipeProperties: null,
    loadingProperties: false,
    errorLoadingProperties: null
};

const pipePropertiesReducer = createReducer(
    initialState,
    on(actionGetAllPipeProperties, (state) => ({
        ...state,
        loadingProperties: true,
        errorLoadingProperties: null
    })),
    on(actionGetAllPipePropertiesSuccess, (state, { pipeProperties }) => ({
        ...state,
        pipeProperties,
        loadingProperties: false
    })),
    on(actionGetAllPipePropertiesError, (state, { errorLoadingProperties }) => ({
        ...state,
        loadingProperties: false,
        errorLoadingProperties
    })),
    on(resetPipePropertiesNotifications, (state) => ({
        ...state,
        errorLoadingProperties: null
    }))
);

export function pipePropertiesReducers(state: PipePropertiesState | undefined, action: Action) {
    return pipePropertiesReducer(state, action);
}
