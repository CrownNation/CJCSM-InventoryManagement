import { pipeProperty_ThreadAdapter } from "./pipe-property-thread.reducers";
import { PipeProperty_ThreadState } from "./pipe-property-thread.state";
import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../core.state";

const { selectEntities, selectAll } = pipeProperty_ThreadAdapter.getSelectors();

export const selectThreadFeature: MemoizedSelector<AppState, PipeProperty_ThreadState> =
  createFeatureSelector<PipeProperty_ThreadState>('pipeProperty_Thread');

export const selectThreadState = createSelector(
    selectThreadFeature,
    (state: PipeProperty_ThreadState) => state
);

export const selectAllThreads = createSelector(selectThreadFeature, selectAll);
export const selectAllThreadEntities = createSelector(selectThreadFeature, selectEntities);

export const selectLoadingThreads = createSelector(
    selectThreadFeature,
    (state: PipeProperty_ThreadState) => state.loadingThreads
);

export const selectErrorLoadingThreads = createSelector(
    selectThreadFeature,
    (state: PipeProperty_ThreadState) => state.errorLoadingThreads
);

export const selectCreatingThread = createSelector(
  selectThreadFeature,
  (state: PipeProperty_ThreadState) => state.creatingThread
);

export const selectCreatedThread = createSelector(
  selectThreadFeature,
  (state: PipeProperty_ThreadState) => state.createdThread
);

export const selectCreatingThreadError = createSelector(
  selectThreadFeature,
  (state: PipeProperty_ThreadState) => state.errorCreatingThread
);

export const selectSelectedThread = createSelector(
    selectThreadFeature,
    (state: PipeProperty_ThreadState) => state.selectedThread
);

export const selectSelectedThreadError = createSelector(
    selectThreadFeature,
    (state: PipeProperty_ThreadState) => state.errorLoadingSelectedThread
);

// Additional selectors for the update process
export const selectUpdatingThread = createSelector(
    selectThreadFeature,
    (state: PipeProperty_ThreadState) => state.updatingThread
);

export const selectUpdatedThread = createSelector(
    selectThreadFeature,
    (state: PipeProperty_ThreadState) => state.updatedThread
);

export const selectUpdatingThreadError = createSelector(
    selectThreadFeature,
    (state: PipeProperty_ThreadState) => state.errorUpdatingThread
);
