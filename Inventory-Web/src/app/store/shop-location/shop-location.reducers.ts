import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { ShopLocationState } from "./shop-location.state";
import { ShopLocation } from "src/app/models/shop-location.model";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import {
  actionCreateShopLocation,
  actionCreateShopLocationSuccess,
  actionCreateShopLocationError,
  actionGetShopLocations,
  actionGetShopLocationsSuccess,
  actionGetShopLocationsError,
  actionGetShopLocation,
  actionGetShopLocationSuccess,
  actionGetShopLocationError,
  actionUpdateShopLocation,
  actionUpdateShopLocationSuccess,
  actionUpdateShopLocationError,
  resetShopLocationNotifications
} from "./shop-location.actions";

export function sortByName(a: ShopLocation, b: ShopLocation): number {
    return a.name.localeCompare(b.name);
}

export const selectId: (shopLocation: ShopLocation) => string = (shopLocation: ShopLocation) => shopLocation.shopLocationId;

export const shopLocationAdapter: EntityAdapter<ShopLocation> = createEntityAdapter<ShopLocation>({
    sortComparer: sortByName,
    selectId: selectId
});

export const initialState: ShopLocationState = shopLocationAdapter.getInitialState({
    ids: [],
    entities: {},
    loadingShopLocations: false,
    errorLoadingShopLocations: null,
    creatingShopLocation: false,
    errorCreatingShopLocation: null,
    selectedShopLocation: null,
    errorLoadingSelectedShopLocation: null,
    shopLocationsList: null,
    errorLoadingShopLocationsList: null,
});

const reducer: ActionReducer<ShopLocationState> = createReducer(
    initialState,
    // Get shop locations
    on(actionGetShopLocations, (state) => ({
        ...state,
        loadingShopLocations: true,
        errorLoadingShopLocations: null,
    })),
    on(actionGetShopLocationsSuccess, (state, { shopLocations }) =>
        shopLocationAdapter.addMany(shopLocations, {
            ...state,
            loadingShopLocations: false,
            errorLoadingShopLocations: null,
            shopLocationsList: shopLocations,
        })
    ),
    on(actionGetShopLocationsError, (state, { errorLoadingShopLocations }) => ({
        ...state,
        loadingShopLocations: false,
        errorLoadingShopLocations
    })),

    // Get single shop location
    on(actionGetShopLocation, (state) => ({
        ...state,
        selectedShopLocation: null,
        errorLoadingSelectedShopLocation: null
    })),
    on(actionGetShopLocationSuccess, (state, { shopLocation }) => ({
        ...state,
        selectedShopLocation: shopLocation,
        errorLoadingSelectedShopLocation: null
    })),
    on(actionGetShopLocationError, (state, { errorLoadingShopLocation }) => ({
        ...state,
        selectedShopLocation: null,
        errorLoadingSelectedShopLocation: errorLoadingShopLocation
    })),

    // Create shop location
    on(actionCreateShopLocation, (state) => ({
        ...state,
        creatingShopLocation: true,
        createdShopLocation: null,
        errorCreatingShopLocation: null
    })),
    on(actionCreateShopLocationSuccess, (state, { shopLocation }) =>
        shopLocationAdapter.addOne(shopLocation, {
            ...state,
            creatingShopLocation: false,
            createdShopLocation: shopLocation,
            errorCreatingShopLocation: null
        })
    ),
    on(actionCreateShopLocationError, (state, { errorCreatingShopLocation }) => ({
        ...state,
        creatingShopLocation: false,
        errorCreatingShopLocation
    })),

    // Update shop location
    on(actionUpdateShopLocation, (state) => ({
        ...state,
        updatingShopLocation: true,
        updatedShopLocation: null,
        errorUpdatingShopLocation: null
    })),
    on(actionUpdateShopLocationSuccess, (state, { shopLocation }) =>
        shopLocationAdapter.updateOne({
            id: shopLocation.shopLocationId,
            changes: shopLocation
        }, {
            ...state,
            updatingShopLocation: false,
            updatedShopLocation: shopLocation,
            errorUpdatingShopLocation: null
        })
    ),
    on(actionUpdateShopLocationError, (state, { errorUpdatingShopLocation }) => ({
        ...state,
        updatingShopLocation: false,
        errorUpdatingShopLocation
    })),

    // Reset notifications
    on(resetShopLocationNotifications, (state) => ({
        ...state,
        createdShopLocation: null,
        updatedShopLocation: null,
        errorLoadingShopLocations: null,
        errorCreatingShopLocation: null,
        errorUpdatingShopLocation: null
    }))
);

export function shopLocationReducers(state: ShopLocationState | undefined, action: Action) {
    return reducer(state, action);
}
