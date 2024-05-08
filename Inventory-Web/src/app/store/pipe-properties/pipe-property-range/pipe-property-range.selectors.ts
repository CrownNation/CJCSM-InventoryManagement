import { pipeProperty_RangeAdapter } from "./pipe-property-range.reducers";
import { PipeProperty_RangeState } from "./pipe-property-range.state";
import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../core.state";

const { selectEntities, selectAll } = pipeProperty_RangeAdapter.getSelectors();

export const selectRangeFeature: MemoizedSelector<AppState, PipeProperty_RangeState> =
  createFeatureSelector<PipeProperty_RangeState>('pipeProperty_Range');

export const selectRangeState = createSelector(
    selectRangeFeature,
    (state: PipeProperty_RangeState) => state
);

export const selectAllRanges = createSelector(selectRangeFeature, selectAll);
export const selectAllRangeEntities = createSelector(selectRangeFeature, selectEntities);

export const selectLoadingRanges = createSelector(
    selectRangeFeature,
    (state: PipeProperty_RangeState) => state.loadingRanges
);

export const selectErrorLoadingRanges = createSelector(
    selectRangeFeature,
    (state: PipeProperty_RangeState) => state.errorLoadingRanges
);

export const selectCreatingRange = createSelector(
  selectRangeFeature,
  (state: PipeProperty_RangeState) => state.creatingRange
);

export const selectCreatedRange = createSelector(
  selectRangeFeature,
  (state: PipeProperty_RangeState) => state.createdRange
);

export const selectCreatingRangeError = createSelector(
  selectRangeFeature,
  (state: PipeProperty_RangeState) => state.errorCreatingRange
);

export const selectSelectedRange = createSelector(
    selectRangeFeature,
    (state: PipeProperty_RangeState) => state.selectedRange
);

export const selectSelectedRangeError = createSelector(
    selectRangeFeature,
    (state: PipeProperty_RangeState) => state.errorLoadingSelectedRange
);

// Additional selectors for the update process
export const selectUpdatingRange = createSelector(
    selectRangeFeature,
    (state: PipeProperty_RangeState) => state.updatingRange
);

export const selectUpdatedRange = createSelector(
    selectRangeFeature,
    (state: PipeProperty_RangeState) => state.updatedRange
);

export const selectUpdatingRangeError = createSelector(
    selectRangeFeature,
    (state: PipeProperty_RangeState) => state.errorUpdatingRange
);
