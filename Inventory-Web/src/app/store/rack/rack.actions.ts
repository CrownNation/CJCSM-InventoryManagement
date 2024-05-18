import { createAction, props } from '@ngrx/store';
import { Rack, RackCreate, RackSearchParams, RackWithStock, RackWithTier } from '../../models/rack.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ShopLocation } from '../../models/shop.model';

export const rackKey = '[Rack]';

// Get Racks
export const actionGetRacks = createAction(
    `${rackKey} Get Racks`,
    props<{ searchParams: RackSearchParams | null}>()
);
export const actionGetRacksSuccess = createAction(
    `${rackKey} Get Racks Success`,
    props<{ racks: Rack[] }>()
);
export const actionGetRacksError = createAction(
    `${rackKey} Get Racks Error`,
    props<{ errorLoadingRacks: HttpErrorResponse }>()
);

// Create Rack
export const actionCreateRack = createAction(
    `${rackKey} Create Rack`,
    props<{ rackCreate: RackCreate }>()
);
export const actionCreateRackSuccess = createAction(
    `${rackKey} Create Rack Success`,
    props<{ rack: Rack }>()
);
export const actionCreateRackError = createAction(
    `${rackKey} Create Rack Error`,
    props<{ errorCreatingRack: HttpErrorResponse }>()
);


// Get Rack by Id
export const actionGetRackById = createAction(
    `${rackKey} Get Rack By Id`,
    props<{ rackId: string }>()
);
export const actionGetRackByIdSuccess = createAction(
    `${rackKey} Get Rack By Id Success`,
    props<{ selectedRack: RackWithStock }>()
);
export const actionGetRackByIdError = createAction(
    `${rackKey} Get Rack By Id Error`,
    props<{ errorLoadingSelectedRack: HttpErrorResponse }>()
);

// Get Full Rack List
export const actionGetRacksFullList = createAction(
    `${rackKey} Get Racks Full List`,
    props<{ searchParams: RackSearchParams | null}>()
);
export const actionGetRacksFullListSuccess = createAction(
    `${rackKey} Get Racks Full List Success`,
    props<{ racksFullList: Rack[] | null}>()
);
export const actionGetRacksFullListError = createAction(
    `${rackKey} Get Racks Full List Error`,
    props<{ errorLoadingRacksList: HttpErrorResponse }>()
);

// Get Racks With Tiers
export const actionGetRacksWithTiers = createAction(
    `${rackKey} Get Racks With Tiers`
);
export const actionGetRacksWithTiersSuccess = createAction(
    `${rackKey} Get Racks With Tiers Success`,
    props<{ racksWithTiers: RackWithTier[] | null}>()
);
export const actionGetRacksWithTiersError = createAction(
    `${rackKey} Get Racks With Tiers Error`,
    props<{ errorLoadingRacksWithTiers: HttpErrorResponse }>()
);

// Get Racks With Tiers
export const actionGetShopLocations = createAction(
    `${rackKey} Get Shop Locations`
);
export const actionGetShopLocationsSuccess = createAction(
    `${rackKey} Get Shop Locations Success`,
    props<{ shopLocations: ShopLocation[] | null}>()
);
export const actionGetShopLocationsError = createAction(
    `${rackKey} Get Shop Locations Error`,
    props<{ errorLoadingShopLocations: HttpErrorResponse }>()
);






