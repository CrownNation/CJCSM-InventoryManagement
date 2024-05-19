import { Action, ActionReducer, createReducer, on} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Rack } from '../../models/rack.model';
import { RackState } from './rack.state';
import { actionCreateRack, actionCreateRackError, actionCreateRackSuccess, actionGetRackById, actionGetRackByIdError, actionGetRackByIdSuccess, actionGetRacks, actionGetRacksError, actionGetRacksSuccess, actionGetRacksWithTiers, actionGetRacksWithTiersError, actionGetRacksWithTiersSuccess, actionGetShopLocations, actionGetShopLocationsError, actionGetShopLocationsSuccess } from './rack.actions';


export function sortByName(a: Rack, b: Rack): number {
    return a.name.localeCompare(b.name);
  }

export const selectId = ({ rackId }: Rack) => rackId;

export const rackAdapater: EntityAdapter<Rack> = createEntityAdapter<Rack>({
    sortComparer: sortByName,
    selectId: selectId
});

export const initialState: RackState = rackAdapater.getInitialState({
    ids: [],
    entities: { },
    loadingRacks: false,
    errorLoadingRacks: null,

    creatingRack: false,
    createdRack: null,
    errorCreatingRack: null,

    selectedRack: null,
    errorLoadingSelectedRack: null,

    racksFullList: null,
    errorLoadingRacksList: null,

    racksWithTiers: null,
    errorLoadingRacksWithTiers: null,

    shopLocations: null,
    errorLoadingShopLocations: null
});

const reducer: ActionReducer<RackState> = createReducer(
    initialState,
    // Retrieve Racks
    on(actionGetRacks, (state: RackState, { searchParams }) => {
        const newState = rackAdapater.removeAll(state); // Needed so it refreshes the subscription fires with new data
        return {
          ...newState,
          loadingRacks: true,
          errorLoadingRacks: null
        };
    }),
    on(actionGetRacksSuccess, (state: RackState, { racks }) =>
        rackAdapater.addMany(racks, state),
    ),
    on(actionGetRacksSuccess, (state: RackState, { racks }) => ({
        ...state,
        loadingRacks: false,
        errorLoadingRacks: null
    })),
    on(actionGetRacksError, (state: RackState, { errorLoadingRacks }) => ({
        ...state,
        loadingRacks: false,
        errorLoadingRacks
    })),

    // Create Rack
    on(actionCreateRack, (state: RackState, { rackCreate }) => ({
        ...state,
        creatingRack: true,
        createdRack: null,
        errorCreatingRack: null
    })),
    on(actionCreateRackSuccess, (state: RackState, { rack }) => {
        return rackAdapater.addOne(rack, {
          ...state,
          creatingRack: false,
          createdRack: rack,
          errorCreatingRack: null
        });
    }),
    on(actionCreateRackError, (state: RackState, { errorCreatingRack }) => ({
        ...state,
        loadincreatingRackgRacks: false,
        createdRack: null,
        errorCreatingRack
    })),

    // Load selected rack
    on(actionGetRackById, (state: RackState, { rackId }) => ({
        ...state,
        selectedRack: null,
        errorLoadingSelectedRack: null
    })),
    on(actionGetRackByIdSuccess, (state: RackState, { selectedRack }) => ({
        ...state,
        selectedRack,
        errorLoadingSelectedRack: null

    })),
    on(actionGetRackByIdError, (state: RackState, { errorLoadingSelectedRack }) => ({
        ...state,
        errorLoadingSelectedRack
    })),

  
    // Retrieve Racks With Tiers List
    on(actionGetRacksWithTiers, (state: RackState, { }) => ({
        ...state,
        racksWithTiers: null,
        errorLoadingRacksWithTiers: null
    })),
    on(actionGetRacksWithTiersSuccess, (state: RackState, { racksWithTiers }) => ({
        ...state,
        racksWithTiers,
        errorLoadingRacksWithTiers: null
    })),
    on(actionGetRacksWithTiersError, (state: RackState, { errorLoadingRacksWithTiers }) => ({
        ...state,
        errorLoadingRacksWithTiers
    })),

    // Shop Locations
    on(actionGetShopLocations, (state: RackState, { }) => ({
        ...state,
        shopLocations: null,
        errorLoadingShopLocations: null
    })),
    on(actionGetShopLocationsSuccess, (state: RackState, { shopLocations }) => ({
        ...state,
        shopLocations,
        errorLoadingShopLocations: null
    })),
    on(actionGetShopLocationsError, (state: RackState, { errorLoadingShopLocations }) => ({
        ...state,
        errorLoadingShopLocations
    })),


);

export function rackReducers(state: RackState | undefined, action: Action) {
    return reducer(state, action);
}