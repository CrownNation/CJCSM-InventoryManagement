import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { PipeProperty_CoatingState } from "./pipe-property-coating.state";
import { PipeProperty_Coating } from "src/app/models/pipe.model";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import {
    actionCreatePipeProperty_Coating,
    actionCreatePipeProperty_CoatingSuccess,
    actionCreatePipeProperty_CoatingError,
    actionGetCoatings,
    actionGetCoatingsSuccess,
    actionGetCoatingsError,
    actionUpdatePipeProperty_Coating,
    actionUpdatePipeProperty_CoatingSuccess,
    actionUpdatePipeProperty_CoatingError,
    resetCoatingNotifications
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
    // Get coatings
    on(actionGetCoatings, (state) => ({
        ...state,
        loadingCoatings: true,
        errorLoadingCoatings: null
    })),
    on(actionGetCoatingsSuccess, (state, { coatings }) =>
        pipeProperty_CoatingAdapter.addMany(coatings, {
            ...state,
            loadingCoatings: false,
            errorLoadingCoatings: null
        })
    ),
    on(actionGetCoatingsError, (state, { errorLoadingCoatings }) => ({
        ...state,
        loadingCoatings: false,
        errorLoadingCoatings
    })),

    // Create coating
    on(actionCreatePipeProperty_Coating, (state) => ({
        ...state,
        creatingCoating: true,
        createdCoating: null,
        errorCreatingCoating: null
    })),
    on(actionCreatePipeProperty_CoatingSuccess, (state, { coating }) =>
        pipeProperty_CoatingAdapter.addOne(coating, {
            ...state,
            creatingCoating: false,
            createdCoating: coating,
            errorCreatingCoating: null
        })
    ),
    on(actionCreatePipeProperty_CoatingError, (state, { errorCreatingCoating }) => ({
        ...state,
        creatingCoating: false,
        errorCreatingCoating
    })),

    // Update coating
    on(actionUpdatePipeProperty_Coating, (state) => ({
        ...state,
        updatingCoating: true,
        errorUpdatingCoating: null
    })),
    on(actionUpdatePipeProperty_CoatingSuccess, (state, { id, coating }) =>
        pipeProperty_CoatingAdapter.updateOne({
            id,
            changes: coating
        }, {
            ...state,
            updatingCoating: false,
            updatedCoating: coating,
            errorUpdatingCoating: null
        })
    ),
    on(actionUpdatePipeProperty_CoatingError, (state, { errorUpdatingCoating }) => ({
        ...state,
        updatingCoating: false,
        errorUpdatingCoating
    })),

    // Reset notifications
    on(resetCoatingNotifications, (state) => ({
        ...state,
        createdCoating: null,
        updatedCoating: null,
        errorLoadingCoatings: null,
        errorCreatingCoating: null,
        errorUpdatingCoating: null
    }))
);

export function PipeProperty_CoatingReducers(state: PipeProperty_CoatingState | undefined, action: Action) {
    return reducer(state, action);
}
