import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { rackAdapater } from "./rack.reducers";
import { AppState, selectRackFeature } from "../core.state";
import { RackState } from "./rack.state";
import { Rack } from "../../models/rack.model";
import { Dictionary } from "@ngrx/entity";


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

// Get Racks
export const selectRacks = createSelector(
    selectAllRackEntities,
    (racksDictionary: Dictionary<Rack>) => Object.values(racksDictionary) as Rack[]
);
export const selectLoadingRacks = createSelector(
    selectRackFeature,
    (state: RackState) => state.loadingRacks
);
export const selectErrorLoadingRacks = createSelector(
    selectRackFeature,
    (state: RackState) => state.errorLoadingRacks
);

// Create Rack
export const selectCreatingRack = createSelector(
  selectRackFeature,
  (state: RackState) => state.creatingRack
);
export const selectCreatedRack = createSelector(
  selectRackFeature,
  (state: RackState) => state.createdRack
);
export const selectCreatedRackError = createSelector(
  selectRackFeature,
  (state: RackState) => state.errorCreatingRack
);

// Selected Rack
export const selectSelectedRack = createSelector(
    selectRackFeature,
    (state: RackState) => state.selectedRack
);
export const selectSelectedRackError = createSelector(
    selectRackFeature,
    (state: RackState) => state.errorLoadingSelectedRack
);

// Full racks full list
/*
export const selectRacksFullList = createSelector(
    selectRackFeature,
    (state: RackState) => state.racksFullList
);
export const selectRacksFullListError = createSelector(
    selectRackFeature,
    (state: RackState) => state.errorLoadingRacksList
);
*/

// Racks with tiers
export const selectRacksWithTiers = createSelector(
  selectRackFeature,
  (state: RackState) => state.racksWithTiers
);
export const selectRacksWithTiersError = createSelector(
  selectRackFeature,
  (state: RackState) => state.errorLoadingRacksWithTiers
);

// Shop Locations
export const selectShopLocations = createSelector(
  selectRackFeature,
  (state: RackState) => state.shopLocations
);
export const selectShopLocationsError = createSelector(
  selectRackFeature,
  (state: RackState) => state.errorLoadingShopLocations
);