import { createAction, props } from '@ngrx/store';
import { RackBasic } from '../../models/rack.model';
import { HttpErrorResponse } from '@angular/common/http';

export const rackKey = '[Rack]';

// Get Racks
export const actionGetRacks = createAction(
    `${rackKey} Get Racks`
);

export const actionGetRacksSuccess = createAction(
    `${rackKey} Get Racks Success`,
    props<{ racks: RackBasic[] }>()
);

export const actionGetRacksError = createAction(
    `${rackKey} Get Racks Error`,
    props<{ errorLoadingRacks: HttpErrorResponse }>()
);

// Get Rack By Id
export const actionGetRackById = createAction(
    `${rackKey} Get Rack By Id`,
    props<{ rackId: string }>()
);


// Create Rack
export const actionCreateRack = createAction(
    `${rackKey} Create Rack`, 
    props<{ rack: RackBasic }>()
);

export const actionCreateRackSuccess = createAction(
    `${rackKey} Create Rack Success`
);

export const actionCreateRackError = createAction(
    `${rackKey} Create Rack Error`
);

// Delete Rack
export const actionDeleteRack = createAction(
    `${rackKey} Delete Rack`, 
    props<{ id: string }>()
);