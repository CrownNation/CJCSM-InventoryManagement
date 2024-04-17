import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { PipeProperty_CoatingState } from "./pipe-property-coating.state";
import { PipeProperty_Coating } from "src/app/models/pipe.model";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { 
    actionCreatePipeProperty_CoatingSuccess, 
    actionGetCoatings, 
    actionGetCoatingsError, 
    actionGetCoatingsSuccess, 
    actionUpdatePipeProperty_CoatingSuccess 
} from "./pipe-property-coating.actions";

export function sortByName(a: PipeProperty_Coating, b: PipeProperty_Coating): number {
    return a.name.localeCompare(b.name);
}

export const selectId: (coating: PipeProperty_Coating) => string = (coating: PipeProperty_Coating) => coating.pipeProperty_CoatingId;

export const pipeProperty_CoatingAdapter: EntityAdapter<PipeProperty_Coating> = createEntityAdapter<PipeProperty_Coating>({
    sortComparer: sortByName,
    selectId: selectId
});

export const initialState: PipeProperty_CoatingState = pipeProperty_CoatingAdapter.getInitialState({
    ids: [],
    entities: {},
    loadingCoatings: false,
    errorLoadingCoatings: null,

    creatingCoating: false,
    createdCoating: null,
    errorCreatingCoating: null,

    updatingCoating: false,
    updatedCoating: null,
    errorUpdatingCoating: null,

    selectedCoating: null,
    errorLoadingSelectedCoating: null
});

const reducer: ActionReducer<PipeProperty_CoatingState> = createReducer(
    initialState,
    on(actionGetCoatings, (state: PipeProperty_CoatingState, {}) => {
        const newState = pipeProperty_CoatingAdapter.removeAll(state);
        return {
          ...newState,
          loadingCoatings: true,
          errorLoadingCoatings: null
        };
    }),
    on(actionCreatePipeProperty_CoatingSuccess, (state, { coating }) => 
        pipeProperty_CoatingAdapter.addOne(coating, {
            ...state,
            loadingCoatings: false,
            errorCreatingCoating: null,
            createdCoating: coating
        })
    ),
    on(actionUpdatePipeProperty_CoatingSuccess, (state, { id, coating }) => 
        pipeProperty_CoatingAdapter.updateOne({
            id,
            changes: coating
        }, state)
    ),
    on(actionGetCoatingsSuccess, (state: PipeProperty_CoatingState, { coatings }) => 
        pipeProperty_CoatingAdapter.addMany(coatings, {
            ...state,
            loadingCoatings: false,
            errorLoadingCoatings: null
        })
    ),
    on(actionGetCoatingsError, (state: PipeProperty_CoatingState, { errorLoadingCoatings }) => ({
        ...state,
        loadingCoatings: false,
        errorLoadingCoatings
    }))
);

export function PipeProperty_CoatingReducers(state: PipeProperty_CoatingState | undefined, action: Action) {
    return reducer(state, action);
}
