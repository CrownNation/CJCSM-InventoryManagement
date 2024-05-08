import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { PipeProperty_ThreadState } from './pipe-property-thread.state';
import { PipeProperty_Thread } from 'src/app/models/pipe.model';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  actionCreatePipeProperty_Thread,
  actionCreatePipeProperty_ThreadSuccess,
  actionCreatePipeProperty_ThreadError,
  actionGetThreads,
  actionGetThreadsError,
  actionGetThreadsSuccess,
  actionUpdatePipeProperty_Thread,
  actionUpdatePipeProperty_ThreadSuccess,
  actionUpdatePipeProperty_ThreadError,
  resetThreadNotifications,
} from './pipe-property-thread.actions';

export function sortByThreadName(a: PipeProperty_Thread, b: PipeProperty_Thread): number {
    return a.name.localeCompare(b.name);
}

export const selectId: (thread: PipeProperty_Thread) => string = (thread: PipeProperty_Thread) => thread.pipeProperty_ThreadId;

export const pipeProperty_ThreadAdapter: EntityAdapter<PipeProperty_Thread> = createEntityAdapter<PipeProperty_Thread>({
    sortComparer: sortByThreadName,
    selectId: selectId
});

export const initialState: PipeProperty_ThreadState = pipeProperty_ThreadAdapter.getInitialState({
    ids: [],
    entities: {},
    loadingThreads: false,
    errorLoadingThreads: null,
    creatingThread: false,
    createdThread: null,
    errorCreatingThread: null,
    updatingThread: false,
    updatedThread: null,
    errorUpdatingThread: null,
    selectedThread: null,
    errorLoadingSelectedThread: null
});

const reducer: ActionReducer<PipeProperty_ThreadState> = createReducer(
    initialState,
    // Get threads
    on(actionGetThreads, (state) => ({
        ...state,
        loadingThreads: true,
        errorLoadingThreads: null
    })),
    on(actionGetThreadsSuccess, (state, { threads }) =>
        pipeProperty_ThreadAdapter.addMany(threads, {
            ...state,
            loadingThreads: false,
            errorLoadingThreads: null
        })),
    on(actionGetThreadsError, (state, { errorLoadingThreads }) => ({
        ...state,
        loadingThreads: false,
        errorLoadingThreads
    })),

    // Create thread
    on(actionCreatePipeProperty_Thread, (state) => ({
        ...state,
        creatingThread: true,
        createdThread: null,
        errorCreatingThread: null
    })),
    on(actionCreatePipeProperty_ThreadSuccess, (state, { thread }) =>
        pipeProperty_ThreadAdapter.addOne(thread, {
            ...state,
            creatingThread: false,
            createdThread: thread,
            errorCreatingThread: null
        })),
    on(actionCreatePipeProperty_ThreadError, (state, { errorCreatingThread }) => ({
        ...state,
        creatingThread: false,
        errorCreatingThread
    })),

    // Update thread
    on(actionUpdatePipeProperty_Thread, (state) => ({
        ...state,
        updatingThread: true,
        errorUpdatingThread: null
    })),
    on(actionUpdatePipeProperty_ThreadSuccess, (state, { id, thread }) =>
        pipeProperty_ThreadAdapter.updateOne({
            id,
            changes: thread
        }, {
            ...state,
            updatingThread: false,
            updatedThread: thread,
            errorUpdatingThread: null
        })),
    on(actionUpdatePipeProperty_ThreadError, (state, { errorUpdatingThread }) => ({
        ...state,
        updatingThread: false,
        errorUpdatingThread
    })),

    // Reset notifications
    on(resetThreadNotifications, (state) => ({
        ...state,
        createdThread: null,
        updatedThread: null,
        errorLoadingThreads: null,
        errorCreatingThread: null,
        errorUpdatingThread: null
    }))
);

export function pipeProperty_ThreadReducers(state: PipeProperty_ThreadState | undefined, action: Action) {
    return reducer(state, action);
}
