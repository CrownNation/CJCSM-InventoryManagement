import { pipeProperty_WallAdapter } from "./pipe-property-wall.reducers";
import { PipeProperty_WallState } from "./pipe-property-wall.state";
import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../core.state";

const { selectEntities, selectAll } = pipeProperty_WallAdapter.getSelectors();

export const selectWallFeature: MemoizedSelector<AppState, PipeProperty_WallState> =
  createFeatureSelector<PipeProperty_WallState>('pipeProperty_Wall');

export const selectWallState = createSelector(
    selectWallFeature,
    (state: PipeProperty_WallState) => state
);

export const selectAllWalls = createSelector(selectWallFeature, selectAll);
export const selectAllWallEntities = createSelector(selectWallFeature, selectEntities);

export const selectLoadingWalls = createSelector(
    selectWallFeature,
    (state: PipeProperty_WallState) => state.loadingWalls
);

export const selectErrorLoadingWalls = createSelector(
    selectWallFeature,
    (state: PipeProperty_WallState) => state.errorLoadingWalls
);

export const selectCreatingWall = createSelector(
  selectWallFeature,
  (state: PipeProperty_WallState) => state.creatingWall
);

export const selectCreatedWall = createSelector(
  selectWallFeature,
  (state: PipeProperty_WallState) => state.createdWall
);

export const selectCreatingWallError = createSelector(
  selectWallFeature,
  (state: PipeProperty_WallState) => state.errorCreatingWall
);

export const selectSelectedWall = createSelector(
    selectWallFeature,
    (state: PipeProperty_WallState) => state.selectedWall
);

export const selectSelectedWallError = createSelector(
    selectWallFeature,
    (state: PipeProperty_WallState) => state.errorLoadingSelectedWall
);

// Additional selectors for the update process
export const selectUpdatingWall = createSelector(
    selectWallFeature,
    (state: PipeProperty_WallState) => state.updatingWall
);

export const selectUpdatedWall = createSelector(
    selectWallFeature,
    (state: PipeProperty_WallState) => state.updatedWall
);

export const selectUpdatingWallError = createSelector(
    selectWallFeature,
    (state: PipeProperty_WallState) => state.errorUpdatingWall
);
