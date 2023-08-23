import { Action, ActionReducer, createReducer, on} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Rack } from '../../models/rack.model';
import { RackState } from './rack.state';
import { actionGetRacks, actionGetRacksError, actionGetRacksSuccess } from './rack.actions';


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
});

const reducer: ActionReducer<RackState> = createReducer(
    initialState,
    on(actionGetRacks, (state: RackState, { }) => ({
        ...state,
        loadingRacks: true,
        errorLoadingRacks: null
    })),

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
);

export function rackReducers(state: RackState | undefined, action: Action) {
    return reducer(state, action);
}