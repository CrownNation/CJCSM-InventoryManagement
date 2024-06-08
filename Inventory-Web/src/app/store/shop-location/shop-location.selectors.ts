import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import { shopLocationAdapter } from "./shop-location.reducers";
import { ShopLocationState } from "./shop-location.state";
import { AppState } from "../../store/core.state";

// Get the selectors from the adapter
const { selectEntities, selectAll } = shopLocationAdapter.getSelectors();

export const selectShopLocationFeature: MemoizedSelector<AppState, ShopLocationState> =
  createFeatureSelector<ShopLocationState>('shopLocation');

export const selectShopLocationState = createSelector(
  selectShopLocationFeature,
  (state: ShopLocationState) => state
);

// Gets array of all data objects
export const selectAllShopLocations = createSelector(selectShopLocationFeature, selectAll);

// Gets dictionary of all data objects
export const selectAllShopLocationEntities = createSelector(selectShopLocationFeature, selectEntities);

// Retrieve flag for if data is being loaded
export const selectLoadingShopLocations = createSelector(
  selectShopLocationFeature,
  (state: ShopLocationState) => state.loadingShopLocations
);

// Retrieve error message for if data fails to load
export const selectErrorLoadingShopLocations = createSelector(
  selectShopLocationFeature,
  (state: ShopLocationState) => state.errorLoadingShopLocations
);

// Retrieve flag for if data is currently being created
export const selectCreatingShopLocation = createSelector(
  selectShopLocationFeature,
  (state: ShopLocationState) => state.creatingShopLocation
);

// Retrieve created data object
export const selectCreatedShopLocation = createSelector(
  selectShopLocationFeature,
  (state: ShopLocationState) => state.selectedShopLocation
);

// Retrieve error message for if data fails to create
export const selectErrorCreatingShopLocation = createSelector(
  selectShopLocationFeature,
  (state: ShopLocationState) => state.errorCreatingShopLocation
);

// Retrieve selected object
export const selectSelectedShopLocation = createSelector(
  selectShopLocationFeature,
  (state: ShopLocationState) => state.selectedShopLocation
);

// Error message for if selected object fails to load
export const selectErrorLoadingSelectedShopLocation = createSelector(
  selectShopLocationFeature,
  (state: ShopLocationState) => state.errorLoadingSelectedShopLocation
);

// Retrieve the list of shop locations
export const selectShopLocationsList = createSelector(
  selectShopLocationFeature,
  (state: ShopLocationState) => state.shopLocationsList
);

// Error message for if the shop locations list fails to load
export const selectErrorLoadingShopLocationsList = createSelector(
  selectShopLocationFeature,
  (state: ShopLocationState) => state.errorLoadingShopLocationsList
);
