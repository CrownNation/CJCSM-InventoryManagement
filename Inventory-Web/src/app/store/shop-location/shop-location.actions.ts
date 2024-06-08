import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ShopLocation, ShopLocationCreate, ShopLocationSearchParams } from "src/app/models/shop-location.model";
export const shopLocationsKey = '[Shop Locations]';

// Get actions
export const actionGetShopLocations = createAction(
    `${shopLocationsKey} Get Shop Locations`,
    props<{ searchParams: ShopLocationSearchParams | null }>()
);

export const actionGetShopLocationsSuccess = createAction(
    `${shopLocationsKey} Get Shop Locations Success`,
    props<{ shopLocations: ShopLocation[] }>()
);
export const actionGetShopLocationsError = createAction(
    `${shopLocationsKey} Get Shop Locations Failure`,
    props<{ errorLoadingShopLocations: HttpErrorResponse }>()
);

// Get single shop location actions
export const actionGetShopLocation = createAction(
    `${shopLocationsKey} Get Shop Location`,
    props<{ id: string }>()
);
export const actionGetShopLocationSuccess = createAction(
    `${shopLocationsKey} Get Shop Location Success`,
    props<{ shopLocation: ShopLocation }>()
);
export const actionGetShopLocationError = createAction(
    `${shopLocationsKey} Get Shop Location Failure`,
    props<{ errorLoadingShopLocation: HttpErrorResponse }>()
);

// Create actions
export const actionCreateShopLocation = createAction(
    `${shopLocationsKey} Create Shop Location`,
    props<{ shopLocationCreate: ShopLocationCreate }>()
);
export const actionCreateShopLocationSuccess = createAction(
    `${shopLocationsKey} Create Shop Location Success`,
    props<{ shopLocation: ShopLocation }>()
);
export const actionCreateShopLocationError = createAction(
    `${shopLocationsKey} Create Shop Location Error`,
    props<{ errorCreatingShopLocation: HttpErrorResponse }>()
);

// Update actions
export const actionUpdateShopLocation = createAction(
    `${shopLocationsKey} Update Shop Location`,
    props<{ id: string; shopLocation: ShopLocation }>()
);

export const actionUpdateShopLocationSuccess = createAction(
    `${shopLocationsKey} Update Shop Location Success`,
    props<{ id: string; shopLocation: ShopLocation }>()
);

export const actionUpdateShopLocationError = createAction(
    `${shopLocationsKey} Update Shop Location Error`,
    props<{ errorUpdatingShopLocation: HttpErrorResponse }>()
);

// Reset notifications
export const resetShopLocationNotifications = createAction(`${shopLocationsKey} Reset Shop Location Notifications`);
