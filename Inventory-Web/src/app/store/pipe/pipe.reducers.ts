import { Action, ActionReducer, createReducer, on} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Pipe } from '../../models/pipe.model';
import { PipeState } from './pipe.state';
import { actionCreatePipe, actionCreatePipeError, actionCreatePipeSuccess,
    actionGetPipe, actionGetPipeById, actionGetPipeByIdError, actionGetPipeByIdSuccess,
    actionGetPipeDefinitionsList, actionGetPipeDefinitionsListError,
    actionGetPipeDefinitionsListSuccess, actionGetPipeError, actionGetPipeSuccess }
    from './pipe.actions';

export function sortByName(a: Pipe, b: Pipe): number {
    return a.rackName.localeCompare(b.rackName);
  }

export const selectId = ({ pipeId }: Pipe) => pipeId;

export const pipeAdapater: EntityAdapter<Pipe> = createEntityAdapter<Pipe>({
    sortComparer: sortByName,
    selectId: selectId
});

export const initialState: PipeState = pipeAdapater.getInitialState({
    ids: [],
    entities: { },
    loadingPipe: false,
    errorLoadingPipe: null,

    creatingPipe: false,
    errorCreatingPipe: null,

    selectedPipe: null,
    errorLoadingSelectedPipe: null,

    pipeDefinitionsList: null,
    errorLoadingPipeDefinitionsList: null,
});

const reducer: ActionReducer<PipeState> = createReducer(
    initialState,
    // Retrieve Pipe
    on(actionGetPipe, (state: PipeState, { searchParams }) => {
        const newState = pipeAdapater.removeAll(state); // Needed so it refreshes the subscription fires with new data
        return {
          ...newState,
          loadingPipe: true,
          errorLoadingPipe: null
        };
    }),
    on(actionGetPipeSuccess, (state: PipeState, { pipe }) => {
        return pipeAdapater.addMany(pipe, {
          ...state,
          loadingPipe: false,
          errorLoadingPipe: null
        });
    }),
    on(actionGetPipeError, (state: PipeState, { errorLoadingPipe }) => ({
        ...state,
        loadingPipe: false,
        errorLoadingPipe
    })),

    // Create Pipe
    on(actionCreatePipe, (state: PipeState, { pipeCreate }) => ({
        ...state,
        creatingPipe: true,
        errorCreatingPipe: null
    })),
    on(actionCreatePipeSuccess, (state: PipeState, { pipe }) => {
        return pipeAdapater.addOne(pipe, {
          ...state,
          creatingPipe: false,
          errorCreatingPipe: null
        });
      }),
    on(actionCreatePipeError, (state: PipeState, { errorCreatingPipe }) => ({
        ...state,
        creatingPipe: false,
        errorCreatingPipe
    })),

    // Load selected pipe
    on(actionGetPipeById, (state: PipeState, { pipeId }) => ({
        ...state,
        selectedPipe: null,
        errorLoadingSelectedPipe: null
    })),
    on(actionGetPipeByIdSuccess, (state: PipeState, { selectedPipe }) => ({
        ...state,
        selectedPipe,
        errorLoadingSelectedPipe: null
    })),
    on(actionGetPipeByIdError, (state: PipeState, { errorLoadingSelectedPipe }) => ({
        ...state,
        errorLoadingSelectedPipe
    })),


);

export function pipeReducers(state: PipeState | undefined, action: Action) {
    return reducer(state, action);
}