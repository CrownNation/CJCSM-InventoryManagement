import { pipeProperty_WeightAdapter } from "./pipe-property-weight.reducers";
import { PipeProperty_WeightState } from "./pipe-property-weight.state";
import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../core.state";

const { selectEntities, selectAll } = pipeProperty_WeightAdapter.getSelectors();

export const selectWeightFeature: MemoizedSelector<AppState, PipeProperty_WeightState> =
  createFeatureSelector<PipeProperty_WeightState>('pipeProperty_Weight');

export const selectWeightState = createSelector(
    selectWeightFeature,
    (state: PipeProperty_WeightState) => state
);

export const selectAllWeights = createSelector(selectWeightFeature, selectAll);
export const selectAllWeightEntities = createSelector(selectWeightFeature, selectEntities);

export const selectLoadingWeights = createSelector(
    selectWeightFeature,
    (state: PipeProperty_WeightState) => state.loadingWeights
);

export const selectErrorLoadingWeights = createSelector(
    selectWeightFeature,
    (state: PipeProperty_WeightState) => state.errorLoadingWeights
);

export const selectCreatingWeight = createSelector(
  selectWeightFeature,
  (state: PipeProperty_WeightState) => state.creatingWeight
);

export const selectCreatedWeight = createSelector(
  selectWeightFeature,
  (state: PipeProperty_WeightState) => state.createdWeight
);

export const selectCreatingWeightError = createSelector(
  selectWeightFeature,
  (state: PipeProperty_WeightState) => state.errorCreatingWeight
);

export const selectSelectedWeight = createSelector(
    selectWeightFeature,
    (state: PipeProperty_WeightState) => state.selectedWeight
);

export const selectSelectedWeightError = createSelector(
    selectWeightFeature,
    (state: PipeProperty_WeightState) => state.errorLoadingSelectedWeight
);

// Additional selectors for the update process
export const selectUpdatingWeight = createSelector(
    selectWeightFeature,
    (state: PipeProperty_WeightState) => state.updatingWeight
);

export const selectUpdatedWeight = createSelector(
    selectWeightFeature,
    (state: PipeProperty_WeightState) => state.updatedWeight
);

export const selectUpdatingWeightError = createSelector(
    selectWeightFeature,
    (state: PipeProperty_WeightState) => state.errorUpdatingWeight
);
