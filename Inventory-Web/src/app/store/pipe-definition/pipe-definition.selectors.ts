import { pipeDefinitionAdapter } from "./pipe-definition.reducers";
import { PipeDefinitionState } from "./pipe-definition.state";
import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../core.state";


// getSelectors returns four default selectors: selectIds, selectEntities, selectAll, and selectTotal.
const { selectEntities, selectAll } = pipeDefinitionAdapter.getSelectors();

export const selectPipeDefinitionFeature: MemoizedSelector<AppState, PipeDefinitionState> =
  createFeatureSelector<PipeDefinitionState>('pipeDefinition');

export const selectPipeDefinitionState = createSelector(
    selectPipeDefinitionFeature,
    (state: PipeDefinitionState) => state
);

// Gets array of all data objects
export const selectAllPipeDefinitions = createSelector(selectPipeDefinitionFeature, selectAll);

// Gets dictionary of all data objects
export const selectAllPipeDefinitionEntities = createSelector(selectPipeDefinitionFeature, selectEntities);

// Retrieve flag for if data is being loaded
export const selectLoadingPipeDefinitions = createSelector(
    selectPipeDefinitionFeature,
    (state: PipeDefinitionState) => state.loadingPipeDefinitions
);

// Retrieve error message for if data fails to load
export const selectErrorLoadingPipeDefinitions = createSelector(
    selectPipeDefinitionFeature,
    (state: PipeDefinitionState) => state.errorLoadingPipeDefinitions
);

// Retrieve flag for if data is currently being created
export const selectCreatingPipeDefinition = createSelector(
  selectPipeDefinitionFeature,
  (state: PipeDefinitionState) => state.creatingPipeDefinition
);

// Retrieve created data object
export const selectCreatedPipeDefinition = createSelector(
  selectPipeDefinitionFeature,
  (state: PipeDefinitionState) => state.createdPipeDefinition
);

// Retrieve error message for if data fails to create
export const selectCreatingPipeDefinitionError = createSelector(
  selectPipeDefinitionFeature,
  (state: PipeDefinitionState) => state.errorCreatingPipeDefinition
);

// Retrieve selected object
export const selectSelectedPipeDefinition = createSelector(
    selectPipeDefinitionFeature,
    (state: PipeDefinitionState) => state.selectedPipeDefinition
);

// Error message for if selected object fails to load
export const selectSelectedPipeDefinitionError = createSelector(
    selectPipeDefinitionFeature,
    (state: PipeDefinitionState) => state.errorLoadingSelectedPipeDefinition
);

// Additional selectors for the update process
export const selectUpdatingPipeDefinition = createSelector(
  selectPipeDefinitionFeature,
  (state: PipeDefinitionState) => state.updatingPipeDefinition
);

export const selectUpdatedPipeDefinition = createSelector(
  selectPipeDefinitionFeature,
  (state: PipeDefinitionState) => state.updatedPipeDefinition
);

export const selectUpdatingPipeDefinitionError = createSelector(
  selectPipeDefinitionFeature,
  (state: PipeDefinitionState) => state.errorUpdatingPipeDefinition
);
