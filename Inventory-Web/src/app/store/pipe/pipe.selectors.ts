import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, selectPipeFeature } from "../core.state";
import { Dictionary } from "@ngrx/entity";
import { PipeState } from './pipe.state';
import { Pipe } from '../../models/pipe.model';
import { pipeAdapater } from './pipe.reducers';


const { selectEntities, selectAll } = pipeAdapater.getSelectors();

export const selectPipeFeature2: MemoizedSelector<AppState, PipeState> =
  createFeatureSelector<PipeState>('pipe');

export const selectPipe2: MemoizedSelector<AppState, Pipe[]> =
createSelector(
    selectPipeFeature2,
  ({ entities }: PipeState): Pipe[] =>
    Object.values(entities) as Pipe[]
);

export const selectPipeState = createSelector(
    selectPipeFeature,
    (state: PipeState) => state
);

export const selectAllPipe = createSelector(selectPipeFeature, selectAll);
export const selectAllPipeEntities = createSelector(selectPipeFeature, selectEntities);


export const selectPipe = createSelector(
    selectAllPipeEntities,
    (pipeDictionary: Dictionary<Pipe>) => Object.values(pipeDictionary) as Pipe[]
);
export const selectLoadingPipe = createSelector(
    selectPipeFeature,
    (state: PipeState) => state.loadingPipe
);
export const selectErrorLoadingPipe = createSelector(
    selectPipeFeature,
    (state: PipeState) => state.errorLoadingPipe
);

// Selected Pipe
export const selectSelectedPipe = createSelector(
    selectPipeFeature,
    (state: PipeState) => state.selectedPipe
  );
export const selectSelectedPipeError = createSelector(
    selectPipeFeature,
    (state: PipeState) => state.errorLoadingSelectedPipe
);

