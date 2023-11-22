import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, selectTallyFeature } from "../core.state";
import { TallyState } from "./tally.state";
import { Tally } from "../../models/tally.model";
import { tallyAdapter } from "./tally.reducers";
import { Dictionary } from "@ngrx/entity";


const { selectEntities, selectAll } = tallyAdapter.getSelectors();

export const selectTallyFeature2: MemoizedSelector<AppState, TallyState> =
  createFeatureSelector<TallyState>('tally');

export const selectTallies2: MemoizedSelector<AppState, Tally[]> = 
createSelector(
    selectTallyFeature2,
  ({ entities }: TallyState): Tally[] => 
    Object.values(entities) as Tally[]
);


export const selectTallyState = createSelector(
    selectTallyFeature,
    (state: TallyState) => state
);

export const selectAllTallys = createSelector(selectTallyFeature, selectAll);
export const selectAllTallyEntities = createSelector(selectTallyFeature, selectEntities);


export const selectTalliesEntities = createSelector(
    selectTallyFeature,
    (state: TallyState) => state.entities
);
export const selectTallies = createSelector(
    selectAllTallyEntities,
    (talliesDictionary: Dictionary<Tally>) => Object.values(talliesDictionary) as Tally[]
  );
export const selectLoadingTallies = createSelector(
    selectTallyFeature,
    (state: TallyState) => state.loadingTallies
);
export const selectErrorLoadingTallies = createSelector(
    selectTallyFeature,
    (state: TallyState) => state.errorLoadingTallies
);

// Selected Tally
export const selectSelectedTally = createSelector(
    selectTallyFeature,
    (state: TallyState) => state.selectedTally
  );
export const selectSelectedTallyError = createSelector(
    selectTallyFeature,
    (state: TallyState) => state.errorLoadingSelectedTally
);
