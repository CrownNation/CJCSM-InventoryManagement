import { Action, ActionReducer, createReducer, on} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { TallyState } from './tally.state';
import { Tally } from '../../models/tally.model';
import { actionCreateTally, actionCreateTallyError, actionCreateTallySuccess, actionGetTallies, actionGetTalliesError, actionGetTalliesSuccess } from './tally.actions';


export function sortByName(a: Tally, b: Tally): number {
    return a.tallyNumber.localeCompare(b.tallyNumber);
  }

export const selectId = ({ tallyId }: Tally) => tallyId;

export const tallyAdapter: EntityAdapter<Tally> = createEntityAdapter<Tally>({
    sortComparer: sortByName,
    selectId: selectId
});

export const initialState: TallyState = tallyAdapter.getInitialState({
ids: [],
entities: { },
loadingTallies: false,
errorLoadingTallies: null,

creatingTally: false,
errorCreatingTally: null,
});

const reducer: ActionReducer<TallyState> = createReducer(
    initialState,
    // Retrieve Tallies
    on(actionGetTallies, (state: TallyState, { }) => ({
        ...state,
        loadingTallies: true,
        errorLoadingTallies: null
    })),
    on(actionGetTalliesSuccess, (state: TallyState, { tallies }) => 
    tallyAdapter.addMany(tallies, state),        
    ),
    on(actionGetTalliesSuccess, (state: TallyState, { tallies }) => ({
        ...state,
        loadingTallies: false,
        errorLoadingTallies: null
    })),        
    on(actionGetTalliesError, (state: TallyState, { errorLoadingTallies }) => ({
        ...state,
        loadingTallies: false,
        errorLoadingTallies
    })),

    // Create Tally
    on(actionCreateTally, (state: TallyState, { tallyCreate }) => ({
        ...state,
        creatingTally: true,
        errorCreatingTally: null
    })),
    on(actionCreateTallySuccess, (state: TallyState, { tally }) => 
        tallyAdapter.addOne(tally, state),        
    ),
    on(actionCreateTallySuccess, (state: TallyState, { tally }) => ({
        ...state,
        creatingTally: false,
        errorCreatingTally: null
    })),        
    on(actionCreateTallyError, (state: TallyState, { errorCreatingTally }) => ({
        ...state,
        creatingTally: false,
        errorCreatingTally
    })),

);

export function tallyReducers(state: TallyState | undefined, action: Action) {
    return reducer(state, action);
}