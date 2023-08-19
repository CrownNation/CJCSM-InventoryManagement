import { createAction, props } from '@ngrx/store';
import { Rack } from '../../models/rack.model';

export const rackKey = '[Rack]';

export const addRack = createAction(
  `${rackKey} Add Rack`, 
  props<{ rack: Rack }>()
);

export const addRackSuccess = createAction(
`${rackKey} Add Rack Success`
);

export const AddRackError = createAction(
`${rackKey} Add Rack Error`
);

export const getRackById = createAction(
    `${rackKey} Get Rack By Id`,
    props<{ rackId: string }>()
);

export const deleteRack = createAction(
  `${rackKey} Delete Rack`, 
  props<{ id: string }>()
);