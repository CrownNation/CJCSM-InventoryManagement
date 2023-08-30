import { createSelector } from "@ngrx/store";
import { rackAdapater } from "./rack.reducers";
import { selectRackFeature } from "../core.state";
import { RackState } from "./rack.state";


const { selectEntities, selectAll } = rackAdapater.getSelectors();

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