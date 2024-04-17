import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { PipeProperty_ThreadState } from './pipe-property-thread.state';
import { PipeProperty_Thread } from 'src/app/models/pipe.model';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  actionCreatePipeProperty_ThreadSuccess,
  actionGetThreads,
  actionGetThreadsError,
  actionGetThreadsSuccess,
  actionUpdatePipeProperty_Thread,
  actionUpdatePipeProperty_ThreadSuccess,
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
    on(actionGetThreads, (state: PipeProperty_ThreadState) => ({
        ...state,
        loadingThreads: true,
        errorLoadingThreads: null
    })),
    on(actionCreatePipeProperty_ThreadSuccess, (state, { thread }) => 
        pipeProperty_ThreadAdapter.addOne(thread, {
            ...state,
            loadingThreads: false,
            errorCreatingThread: null, 
            createdThread: thread
        })),
    on(actionUpdatePipeProperty_Thread, (state) => ({
        ...state,
        updatingThread: true,
        errorUpdatingThread: null
    })),
    on(actionUpdatePipeProperty_ThreadSuccess, (state, { id, thread }) => 
        pipeProperty_ThreadAdapter.updateOne({
            id: id,
            changes: thread
        }, {
            ...state,
            updatingThread: false,
            updatedThread: thread
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
