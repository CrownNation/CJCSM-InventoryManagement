import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { PipeDefinition } from 'src/app/models/pipe.model';
import {
  actionGetPipeDefinitions,
  actionGetPipeDefinitionsSuccess,
  actionGetPipeDefinitionsError,
  actionCreatePipeDefinition,
  actionCreatePipeDefinitionSuccess,
  actionCreatePipeDefinitionError,
  actionUpdatePipeDefinition,
  actionUpdatePipeDefinitionSuccess,
  actionUpdatePipeDefinitionError,
  resetPipeDefinitionNotifications
} from './pipe-definition.actions';
import { PipeDefinitionState } from './pipe-definition.state';

// The selectId function is used by the EntityAdapter to determine the unique identifier (ID) of each entity.
// By default, ngrx/entity assumes that each entity has an id property that acts as its unique identifier.
// If your entity uses a different property as its ID (like pipeDefinitionId), 
// you must specify this through the selectId function.
export const pipeDefinitionAdapter: EntityAdapter<PipeDefinition> = createEntityAdapter<PipeDefinition>({
  selectId: (pipeDefinition: PipeDefinition) => pipeDefinition.pipeDefinitionId
});

const initialState: PipeDefinitionState = pipeDefinitionAdapter.getInitialState({
  loadingPipeDefinitions: false,
  errorLoadingPipeDefinitions: null,
  creatingPipeDefinition: false,
  createdPipeDefinition: null,
  errorCreatingPipeDefinition: null,
  updatingPipeDefinition: false,
  updatedPipeDefinition: null,
  errorUpdatingPipeDefinition: null,
  selectedPipeDefinition: null,
  errorLoadingSelectedPipeDefinition: null
});

export const pipeDefinitionReducer = createReducer(
  initialState,
  on(actionGetPipeDefinitions, (state) => ({
    ...state,
    loadingPipeDefinitions: true
  })),
  on(actionGetPipeDefinitionsSuccess, (state, { pipeDefinitions }) =>
    pipeDefinitionAdapter.setAll(pipeDefinitions, {
      ...state,
      loadingPipeDefinitions: false
    })
  ),
  on(actionGetPipeDefinitionsError, (state, { errorLoadingPipeDefinitions }) => ({
    ...state,
    loadingPipeDefinitions: false,
    errorLoadingPipeDefinitions: errorLoadingPipeDefinitions
  })),
  on(actionCreatePipeDefinition, (state) => ({
    ...state,
    creatingPipeDefinition: true
  })),
  on(actionCreatePipeDefinitionSuccess, (state, { pipeDefinition }) =>
    pipeDefinitionAdapter.addOne(pipeDefinition, {
      ...state,
      creatingPipeDefinition: false,
      createdPipeDefinition: pipeDefinition
    })
  ),
  on(actionCreatePipeDefinitionError, (state, { errorCreatingPipeDefinition }) => ({
    ...state,
    creatingPipeDefinition: false,
    errorCreatingPipeDefinition: errorCreatingPipeDefinition
  })),
  on(actionUpdatePipeDefinition, (state) => ({
    ...state,
    updatingPipeDefinition: true
  })),
  on(actionUpdatePipeDefinitionSuccess, (state, { pipeDefinition }) =>
    pipeDefinitionAdapter.updateOne(
      { id: pipeDefinition.pipeDefinitionId, changes: pipeDefinition },
      {
        ...state,
        updatingPipeDefinition: false,
        updatedPipeDefinition: pipeDefinition
      }
    )
  ),
  on(actionUpdatePipeDefinitionError, (state, { errorUpdatingPipeDefinition }) => ({
    ...state,
    updatingPipeDefinition: false,
    errorUpdatingPipeDefinition: errorUpdatingPipeDefinition
  })),
  on(resetPipeDefinitionNotifications, (state) => ({
    ...state,
    errorLoadingPipeDefinitions: null,
    errorCreatingPipeDefinition: null,
    errorUpdatingPipeDefinition: null
  }))
);

// Make sure to export the reducer with a call to function that returns the on operation
export function reducer(state: PipeDefinitionState | undefined, action: any): PipeDefinitionState {
  return pipeDefinitionReducer(state, action);
}
