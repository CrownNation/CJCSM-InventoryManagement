import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, selectTallyFeature } from "../core.state";
import { TallyState } from "./tally.state";
import { Tally } from "../../models/tally.model";
import { tallyAdapter } from "./tally.reducers";


const { selectEntities, selectAll } = tallyAdapter.getSelectors();

export const selectTallyFeature2: MemoizedSelector<AppState, TallyState> =
  createFeatureSelector<TallyState>('tally');

export const selectTallys2: MemoizedSelector<AppState, Tally[]> = 
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


export const selectTallys = createSelector(
    selectTallyFeature,
    (state: TallyState) => state.entities
);
export const selectLoadingTallys = createSelector(
    selectTallyFeature,
    (state: TallyState) => state.loadingTallies
);
export const selectErrorLoadingTallys = createSelector(
    selectTallyFeature,
    (state: TallyState) => state.errorLoadingTallies
);