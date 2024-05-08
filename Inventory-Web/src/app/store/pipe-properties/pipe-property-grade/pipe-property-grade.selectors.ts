import { pipeProperty_GradeAdapter } from "./pipe-property-grade.reducers";
import { PipeProperty_GradeState } from "./pipe-property-grade.state";
import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../core.state";

const { selectEntities, selectAll } = pipeProperty_GradeAdapter.getSelectors();

export const selectGradeFeature: MemoizedSelector<AppState, PipeProperty_GradeState> =
  createFeatureSelector<PipeProperty_GradeState>('pipeProperty_Grade');

export const selectGradeState = createSelector(
    selectGradeFeature,
    (state: PipeProperty_GradeState) => state
);

export const selectAllGrades = createSelector(selectGradeFeature, selectAll);
export const selectAllGradeEntities = createSelector(selectGradeFeature, selectEntities);

export const selectLoadingGrades = createSelector(
    selectGradeFeature,
    (state: PipeProperty_GradeState) => state.loadingGrades
);

export const selectErrorLoadingGrades = createSelector(
    selectGradeFeature,
    (state: PipeProperty_GradeState) => state.errorLoadingGrades
);

export const selectCreatingGrade = createSelector(
  selectGradeFeature,
  (state: PipeProperty_GradeState) => state.creatingGrade
);

export const selectCreatedGrade = createSelector(
  selectGradeFeature,
  (state: PipeProperty_GradeState) => state.createdGrade
);

export const selectCreatingGradeError = createSelector(
  selectGradeFeature,
  (state: PipeProperty_GradeState) => state.errorCreatingGrade
);

export const selectSelectedGrade = createSelector(
    selectGradeFeature,
    (state: PipeProperty_GradeState) => state.selectedGrade
);

export const selectSelectedGradeError = createSelector(
    selectGradeFeature,
    (state: PipeProperty_GradeState) => state.errorLoadingSelectedGrade
);

// Additional selectors for the update process
export const selectUpdatingGrade = createSelector(
    selectGradeFeature,
    (state: PipeProperty_GradeState) => state.updatingGrade
);

export const selectUpdatedGrade = createSelector(
    selectGradeFeature,
    (state: PipeProperty_GradeState) => state.updatedGrade
);

export const selectUpdatingGradeError = createSelector(
    selectGradeFeature,
    (state: PipeProperty_GradeState) => state.errorUpdatingGrade
);
