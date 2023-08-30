// import { ActionReducer, createReducer, on } from '@ngrx/store';
// import { adapter, initialState, RackState } from './rack.state';
// import { addRack, deleteRack, getRacksSuccess } from './rack.actions';

// export const rackReducers: ActionReducer<RackState> = createReducer(
//     initialState,
//     on(addRack, (state: RackState, { rack }) => 
//         adapter.addOne(rack, state)),
    
//     on(getRacksSuccess, (state: RackState, { racks }) => 
//         adapter.addMany(racks, state),
//     ),
        
//     on(deleteRack, (state: RackState, { id }) => 
//         adapter.removeOne(id, state))
// );