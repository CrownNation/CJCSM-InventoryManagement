import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { PipeProperty_RangeState } from './pipe-property-range.state';
import { PipeProperty_Range } from 'src/app/models/pipe.model';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  actionCreatePipeProperty_RangeSuccess,
  actionGetRanges,
  actionGetRangesError,
  actionGetRangesSuccess,
  actionUpdatePipeProperty_Range,
  actionUpdatePipeProperty_RangeSuccess,
  resetRangeNotifications,
} from './pipe-property-range.actions';

export function sortByRangeName(a: PipeProperty_Range, b: PipeProperty_Range): number {
    return a.name.localeCompare(b.name);
}

export const selectId: (range: PipeProperty_Range) => string = (range: PipeProperty_Range) => range.pipeProperty_RangeId;

export const pipeProperty_RangeAdapter: EntityAdapter<PipeProperty_Range> = createEntityAdapter<PipeProperty_Range>({
    sortComparer: sortByRangeName,
    selectId: selectId
});

export const initialState: PipeProperty_RangeState = pipeProperty_RangeAdapter.getInitialState({
    ids: [],
    entities: {},
    loadingRanges: false,
    errorLoadingRanges: null,
    creatingRange: false,
    createdRange: null,
    errorCreatingRange: null,
    updatingRange: false,
    updatedRange: null,
    errorUpdatingRange: null,
    selectedRange: null,
    errorLoadingSelectedRange: null
});

const reducer: ActionReducer<PipeProperty_RangeState> = createReducer(
    initialState,
    on(actionGetRanges, (state: PipeProperty_RangeState) => ({
        ...state,
        loadingRanges: true,
        errorLoadingRanges: null
    })),
    on(actionCreatePipeProperty_RangeSuccess, (state, { range }) => 
        pipeProperty_RangeAdapter.addOne(range, {
            ...state,
            loadingRanges: false,
            errorCreatingRange: null, 
            createdRange: range
        })),
    on(actionUpdatePipeProperty_Range, (state) => ({
        ...state,
        updatingRange: true,
        errorUpdatingRange: null
    })),
    on(actionUpdatePipeProperty_RangeSuccess, (state, { id, range }) => 
        pipeProperty_RangeAdapter.updateOne({
            id: id,
            changes: range
        }, {
            ...state,
            updatingRange: false,
            updatedRange: range
        })),
    on(actionGetRangesSuccess, (state, { ranges }) => 
        pipeProperty_RangeAdapter.addMany(ranges, {
            ...state,
            loadingRanges: false,
            errorLoadingRanges: null
        })),
    on(actionGetRangesError, (state, { errorLoadingRanges }) => ({
        ...state,
        loadingRanges: false,
        errorLoadingRanges
    })),  
    on(resetRangeNotifications, (state) => ({
        ...state,
        createdRange: null,
        updatedRange: null,
        errorLoadingRanges: null,
        errorCreatingRange: null,
        errorUpdatingRange: null
      }))
    );

export function pipeProperty_RangeReducers(state: PipeProperty_RangeState | undefined, action: Action) {
    return reducer(state, action);
}
