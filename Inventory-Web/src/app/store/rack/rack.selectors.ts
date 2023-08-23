import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { rackAdapater } from "./rack.reducers";
import { AppState, selectRackFeature } from "../core.state";
import { RackState } from "./rack.state";
import { Rack } from "../../models/rack.model";


const { selectEntities, selectAll } = rackAdapater.getSelectors();

export const selectRackFeature2: MemoizedSelector<AppState, RackState> =
  createFeatureSelector<RackState>('rack');

export const selectRacks2: MemoizedSelector<AppState, Rack[]> = 
createSelector(
    selectRackFeature2,
  ({ entities }: RackState): Rack[] => 
    Object.values(entities) as Rack[]
);


export const selectRackState = createSelector(
    selectRackFeature,
    (state: RackState) => state
);

export const selectAllRacks = createSelector(selectRackFeature, selectAll);
export const selectAllRackEntities = createSelector(selectRackFeature, selectEntities);


export const selectRacks = createSelector(
    selectRackFeature,
    (state: RackState) => state.entities
);
export const selectLoadingRacks = createSelector(
    selectRackFeature,
    (state: RackState) => state.loadingRacks
);
export const selectErrorLoadingRacks = createSelector(
    selectRackFeature,
    (state: RackState) => state.errorLoadingRacks
);