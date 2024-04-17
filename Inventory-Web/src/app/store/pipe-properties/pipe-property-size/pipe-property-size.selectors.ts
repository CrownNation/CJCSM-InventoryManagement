import { pipeProperty_SizeAdapter } from "./pipe-property-size.reducers";
import { PipeProperty_SizeState } from "./pipe-property-size.state";
import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../core.state";

const { selectEntities, selectAll } = pipeProperty_SizeAdapter.getSelectors();

export const selectSizeFeature: MemoizedSelector<AppState, PipeProperty_SizeState> =
  createFeatureSelector<PipeProperty_SizeState>('pipeProperty_Size');

export const selectSizeState = createSelector(
    selectSizeFeature,
    (state: PipeProperty_SizeState) => state
);

export const selectAllSizes = createSelector(selectSizeFeature, selectAll);
export const selectAllSizeEntities = createSelector(selectSizeFeature, selectEntities);

export const selectLoadingSizes = createSelector(
    selectSizeFeature,
    (state: PipeProperty_SizeState) => state.loadingSizes
);

export const selectErrorLoadingSizes = createSelector(
    selectSizeFeature,
    (state: PipeProperty_SizeState) => state.errorLoadingSizes
);

export const selectCreatingSize = createSelector(
  selectSizeFeature,
  (state: PipeProperty_SizeState) => state.creatingSize
);

export const selectCreatedSize = createSelector(
  selectSizeFeature,
  (state: PipeProperty_SizeState) => state.createdSize
);

export const selectCreatingSizeError = createSelector(
  selectSizeFeature,
  (state: PipeProperty_SizeState) => state.errorCreatingSize
);

export const selectSelectedSize = createSelector(
    selectSizeFeature,
    (state: PipeProperty_SizeState) => state.selectedSize
);

export const selectSelectedSizeError = createSelector(
    selectSizeFeature,
    (state: PipeProperty_SizeState) => state.errorLoadingSelectedSize
);

// Additional selectors for the update process
export const selectUpdatingSize = createSelector(
    selectSizeFeature,
    (state: PipeProperty_SizeState) => state.updatingSize
);

export const selectUpdatedSize = createSelector(
    selectSizeFeature,
    (state: PipeProperty_SizeState) => state.updatedSize
);

export const selectUpdatingSizeError = createSelector(
    selectSizeFeature,
    (state: PipeProperty_SizeState) => state.errorUpdatingSize
);
