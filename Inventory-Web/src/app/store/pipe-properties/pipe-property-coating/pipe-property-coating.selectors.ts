import { pipeProperty_CoatingAdapter } from "./pipe-property-coating.reducers";
import { PipeProperty_CoatingState } from "./pipe-property-coating.state";
import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../core.state";

const { selectEntities, selectAll } = pipeProperty_CoatingAdapter.getSelectors();

export const selectCoatingFeature: MemoizedSelector<AppState, PipeProperty_CoatingState> =
  createFeatureSelector<PipeProperty_CoatingState>('pipeProperty_Coating');

export const selectCoatingState = createSelector(
    selectCoatingFeature,
    (state: PipeProperty_CoatingState) => state
);

export const selectAllCoatings = createSelector(selectCoatingFeature, selectAll);
export const selectAllCoatingEntities = createSelector(selectCoatingFeature, selectEntities);

export const selectLoadingCoatings = createSelector(
    selectCoatingFeature,
    (state: PipeProperty_CoatingState) => state.loadingCoatings
);

export const selectErrorLoadingCoatings = createSelector(
    selectCoatingFeature,
    (state: PipeProperty_CoatingState) => state.errorLoadingCoatings
);

export const selectCreatingCoating = createSelector(
  selectCoatingFeature,
  (state: PipeProperty_CoatingState) => state.creatingCoating
);

export const selectCreatedCoating = createSelector(
  selectCoatingFeature,
  (state: PipeProperty_CoatingState) => state.createdCoating
);

export const selectCreatingCoatingError = createSelector(
  selectCoatingFeature,
  (state: PipeProperty_CoatingState) => state.errorCreatingCoating
);

export const selectSelectedCoating = createSelector(
    selectCoatingFeature,
    (state: PipeProperty_CoatingState) => state.selectedCoating
);

export const selectSelectedCoatingError = createSelector(
    selectCoatingFeature,
    (state: PipeProperty_CoatingState) => state.errorLoadingSelectedCoating
);

// Additional selectors for the update process
export const selectUpdatingCoating = createSelector(
    selectCoatingFeature,
    (state: PipeProperty_CoatingState) => state.updatingCoating
);

export const selectUpdatedCoating = createSelector(
    selectCoatingFeature,
    (state: PipeProperty_CoatingState) => state.updatedCoating
);

export const selectUpdatingCoatingError = createSelector(
    selectCoatingFeature,
    (state: PipeProperty_CoatingState) => state.errorUpdatingCoating
);
