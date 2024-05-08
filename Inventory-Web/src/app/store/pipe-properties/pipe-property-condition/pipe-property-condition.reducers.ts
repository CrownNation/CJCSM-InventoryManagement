import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { PipeProperty_ConditionState } from "./pipe-property-condition.state";
import { PipeProperty_Condition } from "src/app/models/pipe.model";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { 
    actionCreatePipeProperty_Condition,
    actionCreatePipeProperty_ConditionError,
    actionCreatePipeProperty_ConditionSuccess, 
    actionGetConditions, 
    actionGetConditionsError, 
    actionGetConditionsSuccess, 
    actionUpdatePipeProperty_Condition, 
    actionUpdatePipeProperty_ConditionError, 
    actionUpdatePipeProperty_ConditionSuccess, 
    resetConditionNotifications
} from "./pipe-property-condition.actions";

export function sortByName(a: PipeProperty_Condition, b: PipeProperty_Condition): number {
    return a.name.localeCompare(b.name);
}

export const selectId: (condition: PipeProperty_Condition) => string = (condition: PipeProperty_Condition) => condition.pipeProperty_ConditionId;

export const pipeProperty_ConditionAdapter: EntityAdapter<PipeProperty_Condition> = createEntityAdapter<PipeProperty_Condition>({
    sortComparer: sortByName,
    selectId: selectId
});

export const initialState: PipeProperty_ConditionState = pipeProperty_ConditionAdapter.getInitialState({
    ids: [],
    entities: {},
    loadingConditions: false,
    errorLoadingConditions: null,

    creatingCondition: false,
    createdCondition: null,
    errorCreatingCondition: null,

    updatingCondition: false,
    updatedCondition: null,
    errorUpdatingCondition: null,

    selectedCondition: null,
    errorLoadingSelectedCondition: null
});

const reducer: ActionReducer<PipeProperty_ConditionState> = createReducer(
    initialState,
    // Get conditions
    on(actionGetConditions, (state) => ({
        ...state,
        loadingConditions: true,
        errorLoadingConditions: null
    })),
    on(actionGetConditionsSuccess, (state, { conditions }) =>
        pipeProperty_ConditionAdapter.addMany(conditions, {
            ...state,
            loadingConditions: false,
            errorLoadingConditions: null
        })
    ),
    on(actionGetConditionsError, (state, { errorLoadingConditions }) => ({
        ...state,
        loadingConditions: false,
        errorLoadingConditions
    })),

    // Create condition
    on(actionCreatePipeProperty_Condition, (state) => ({
        ...state,
        creatingCondition: true,
        createdCondition: null,
        errorCreatingCondition: null
    })),
    on(actionCreatePipeProperty_ConditionSuccess, (state, { condition }) =>
        pipeProperty_ConditionAdapter.addOne(condition, {
            ...state,
            creatingCondition: false,
            createdCondition: condition,
            errorCreatingCondition: null
        })
    ),
    on(actionCreatePipeProperty_ConditionError, (state, { errorCreatingCondition }) => ({
        ...state,
        creatingCondition: false,
        errorCreatingCondition
    })),

    // Update condition
    on(actionUpdatePipeProperty_Condition, (state) => ({
        ...state,
        updatingCondition: true,
        errorUpdatingCondition: null
    })),
    on(actionUpdatePipeProperty_ConditionSuccess, (state, { id, condition }) =>
        pipeProperty_ConditionAdapter.updateOne({
            id,
            changes: condition
        }, {
            ...state,
            updatingCondition: false,
            updatedCondition: condition,
            errorUpdatingCondition: null
        })
    ),
    on(actionUpdatePipeProperty_ConditionError, (state, { errorUpdatingCondition }) => ({
        ...state,
        updatingCondition: false,
        errorUpdatingCondition
    })),

    // Reset notifications
    on(resetConditionNotifications, (state) => ({
        ...state,
        createdCondition: null,
        updatedCondition: null,
        errorLoadingConditions: null,
        errorCreatingCondition: null,
        errorUpdatingCondition: null
    }))
);

export function PipeProperty_ConditionReducers(state: PipeProperty_ConditionState | undefined, action: Action) {
    return reducer(state, action);
}