import { pipeProperty_ConditionAdapter } from "./pipe-property-condition.reducers";
import { PipeProperty_ConditionState } from "./pipe-property-condition.state";
import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../core.state";

const { selectEntities, selectAll } = pipeProperty_ConditionAdapter.getSelectors();

export const selectConditionFeature: MemoizedSelector<AppState, PipeProperty_ConditionState> =
  createFeatureSelector<PipeProperty_ConditionState>('pipeProperty_Condition');

export const selectConditionState = createSelector(
    selectConditionFeature,
    (state: PipeProperty_ConditionState) => state
);

export const selectAllConditions = createSelector(selectConditionFeature, selectAll);
export const selectAllConditionEntities = createSelector(selectConditionFeature, selectEntities);

export const selectLoadingConditions = createSelector(
    selectConditionFeature,
    (state: PipeProperty_ConditionState) => state.loadingConditions
);

export const selectErrorLoadingConditions = createSelector(
    selectConditionFeature,
    (state: PipeProperty_ConditionState) => state.errorLoadingConditions
);

export const selectCreatingCondition = createSelector(
  selectConditionFeature,
  (state: PipeProperty_ConditionState) => state.creatingCondition
);

export const selectCreatedCondition = createSelector(
  selectConditionFeature,
  (state: PipeProperty_ConditionState) => state.createdCondition
);

export const selectCreatingConditionError = createSelector(
  selectConditionFeature,
  (state: PipeProperty_ConditionState) => state.errorCreatingCondition
);

export const selectSelectedCondition = createSelector(
    selectConditionFeature,
    (state: PipeProperty_ConditionState) => state.selectedCondition
);

export const selectSelectedConditionError = createSelector(
    selectConditionFeature,
    (state: PipeProperty_ConditionState) => state.errorLoadingSelectedCondition
);

// Additional selectors for the update process
export const selectUpdatingCondition = createSelector(
    selectConditionFeature,
    (state: PipeProperty_ConditionState) => state.updatingCondition
);

export const selectUpdatedCondition = createSelector(
    selectConditionFeature,
    (state: PipeProperty_ConditionState) => state.updatedCondition
);

export const selectUpdatingConditionError = createSelector(
    selectConditionFeature,
    (state: PipeProperty_ConditionState) => state.errorUpdatingCondition
);
