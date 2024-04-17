import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { PipeProperty_SizeState } from './pipe-property-size.state';
import { PipeProperty_Size } from 'src/app/models/pipe.model';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  actionCreatePipeProperty_SizeSuccess,
  actionGetSizes,
  actionGetSizesError,
  actionGetSizesSuccess,
  actionUpdatePipeProperty_Size,
  actionUpdatePipeProperty_SizeSuccess,
  resetSizeNotifications,
} from './pipe-property-size.actions';

export function sortBySizeMetric(a: PipeProperty_Size, b: PipeProperty_Size): number {
    return a.sizeMetric - b.sizeMetric;
}

export const selectId: (size: PipeProperty_Size) => string = (size: PipeProperty_Size) => size.pipeProperty_SizeId;

export const pipeProperty_SizeAdapter: EntityAdapter<PipeProperty_Size> = createEntityAdapter<PipeProperty_Size>({
    sortComparer: sortBySizeMetric,
    selectId: selectId
});

export const initialState: PipeProperty_SizeState = pipeProperty_SizeAdapter.getInitialState({
    ids: [],
    entities: {},
    loadingSizes: false,
    errorLoadingSizes: null,
    creatingSize: false,
    createdSize: null,
    errorCreatingSize: null,
    updatingSize: false,
    updatedSize: null,
    errorUpdatingSize: null,
    selectedSize: null,
    errorLoadingSelectedSize: null
});

const reducer: ActionReducer<PipeProperty_SizeState> = createReducer(
    initialState,
    on(actionGetSizes, (state: PipeProperty_SizeState) => ({
        ...state,
        loadingSizes: true,
        errorLoadingSizes: null
    })),
    on(actionCreatePipeProperty_SizeSuccess, (state, { size }) => 
        pipeProperty_SizeAdapter.addOne(size, {
            ...state,
            loadingSizes: false,
            errorCreatingSize: null, 
            createdSize: size
        })),
    on(actionUpdatePipeProperty_Size, (state) => ({
        ...state,
        updatingSize: true,
        errorUpdatingSize: null
    })),
    on(actionUpdatePipeProperty_SizeSuccess, (state, { id, size }) => 
        pipeProperty_SizeAdapter.updateOne({
            id: id,
            changes: size
        }, {
            ...state,
            updatingSize: false,
            updatedSize: size
        })),
    on(actionGetSizesSuccess, (state, { sizes }) => 
        pipeProperty_SizeAdapter.addMany(sizes, {
            ...state,
            loadingSizes: false,
            errorLoadingSizes: null
        })),
    on(actionGetSizesError, (state, { errorLoadingSizes }) => ({
        ...state,
        loadingSizes: false,
        errorLoadingSizes
    })),  
    on(resetSizeNotifications, (state) => ({
        ...state,
        createdSize: null,
        updatedSize: null,
        errorLoadingSizes: null,
        errorCreatingSize: null,
        errorUpdatingSize: null
      }))
    );

export function pipeProperty_SizeReducers(state: PipeProperty_SizeState | undefined, action: Action) {
    return reducer(state, action);
}