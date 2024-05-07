import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { PipeProperty_WeightState } from './pipe-property-weight.state';
import { PipeProperty_Weight } from 'src/app/models/pipe.model';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  actionCreatePipeProperty_Weight,
  actionCreatePipeProperty_WeightSuccess,
  actionCreatePipeProperty_WeightError,
  actionGetWeights,
  actionGetWeightsError,
  actionGetWeightsSuccess,
  actionUpdatePipeProperty_Weight,
  actionUpdatePipeProperty_WeightSuccess,
  actionUpdatePipeProperty_WeightError,
  resetWeightNotifications,
} from './pipe-property-weight.actions';

export function sortByWeightMetric(a: PipeProperty_Weight, b: PipeProperty_Weight): number {
    return a.weightInKgPerMeter - b.weightInKgPerMeter;
}

export const selectId: (weight: PipeProperty_Weight) => string = (weight: PipeProperty_Weight) => weight.pipeProperty_WeightId;

export const pipeProperty_WeightAdapter: EntityAdapter<PipeProperty_Weight> = createEntityAdapter<PipeProperty_Weight>({
    sortComparer: sortByWeightMetric,
    selectId: selectId
});

export const initialState: PipeProperty_WeightState = pipeProperty_WeightAdapter.getInitialState({
    ids: [],
    entities: {},
    loadingWeights: false,
    errorLoadingWeights: null,
    creatingWeight: false,
    createdWeight: null,
    errorCreatingWeight: null,
    updatingWeight: false,
    updatedWeight: null,
    errorUpdatingWeight: null,
    selectedWeight: null,
    errorLoadingSelectedWeight: null
});

const reducer: ActionReducer<PipeProperty_WeightState> = createReducer(
    initialState,
    // Get weights
    on(actionGetWeights, (state) => ({
        ...state,
        loadingWeights: true,
        errorLoadingWeights: null
    })),
    on(actionGetWeightsSuccess, (state, { weights }) =>
        pipeProperty_WeightAdapter.addMany(weights, {
            ...state,
            loadingWeights: false,
            errorLoadingWeights: null
        })),
    on(actionGetWeightsError, (state, { errorLoadingWeights }) => ({
        ...state,
        loadingWeights: false,
        errorLoadingWeights
    })),

    // Create weight
    on(actionCreatePipeProperty_Weight, (state) => ({
        ...state,
        creatingWeight: true,
        createdWeight: null,
        errorCreatingWeight: null
    })),
    on(actionCreatePipeProperty_WeightSuccess, (state, { weight }) =>
        pipeProperty_WeightAdapter.addOne(weight, {
            ...state,
            creatingWeight: false,
            createdWeight: weight,
            errorCreatingWeight: null
        })),
    on(actionCreatePipeProperty_WeightError, (state, { errorCreatingWeight }) => ({
        ...state,
        creatingWeight: false,
        errorCreatingWeight
    })),

    // Update weight
    on(actionUpdatePipeProperty_Weight, (state) => ({
        ...state,
        updatingWeight: true,
        errorUpdatingWeight: null
    })),
    on(actionUpdatePipeProperty_WeightSuccess, (state, { id, weight }) =>
        pipeProperty_WeightAdapter.updateOne({
            id,
            changes: weight
        }, {
            ...state,
            updatingWeight: false,
            updatedWeight: weight,
            errorUpdatingWeight: null
        })),
    on(actionUpdatePipeProperty_WeightError, (state, { errorUpdatingWeight }) => ({
        ...state,
        updatingWeight: false,
        errorUpdatingWeight
    })),

    // Reset notifications
    on(resetWeightNotifications, (state) => ({
        ...state,
        createdWeight: null,
        updatedWeight: null,
        errorLoadingWeights: null,
        errorCreatingWeight: null,
        errorUpdatingWeight: null
    }))
);

export function pipeProperty_WeightReducers(state: PipeProperty_WeightState | undefined, action: Action) {
    return reducer(state, action);
}
