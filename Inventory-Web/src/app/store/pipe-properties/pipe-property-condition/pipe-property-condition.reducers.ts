import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { PipeProperty_ConditionState } from "./pipe-property-condition.state";
import { PipeProperty_Condition } from "src/app/models/pipe.model";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { 
    actionCreatePipeProperty_ConditionSuccess, 
    actionGetConditions, 
    actionGetConditionsError, 
    actionGetConditionsSuccess, 
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
    on(actionGetConditions, (state: PipeProperty_ConditionState, {}) => {
        const newState = pipeProperty_ConditionAdapter.removeAll(state);
        return {
          ...newState,
          loadingConditions: true,
          errorLoadingConditions: null
        };
    }),
    on(actionCreatePipeProperty_ConditionSuccess, (state, { condition }) => 
        pipeProperty_ConditionAdapter.addOne(condition, {
            ...state,
            loadingConditions: false,
            errorCreatingCondition: null,
            createdCondition: condition
        })
    ),
    on(actionUpdatePipeProperty_ConditionSuccess, (state, { id, condition }) => 
        pipeProperty_ConditionAdapter.updateOne({
            id,
            changes: condition
        }, state)
    ),
    on(actionGetConditionsSuccess, (state: PipeProperty_ConditionState, { conditions }) => 
        pipeProperty_ConditionAdapter.addMany(conditions, {
            ...state,
            loadingConditions: false,
            errorLoadingConditions: null
        })
    ),
    on(actionGetConditionsError, (state: PipeProperty_ConditionState, { errorLoadingConditions }) => ({
        ...state,
        loadingConditions: false,
        errorLoadingConditions
    })),
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
