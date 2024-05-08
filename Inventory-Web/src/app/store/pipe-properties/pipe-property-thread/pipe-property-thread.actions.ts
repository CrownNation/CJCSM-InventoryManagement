import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { PipeProperty_Thread, PipeProperty_ThreadCreate, PipeProperty_ThreadSearchParams } from "src/app/models/pipe.model";

export const threadsKey = '[Pipe Properties Thread]';

// Get actions
export const actionGetThreads = createAction(
    `${threadsKey} Get Threads`,
    props<{ searchParams: PipeProperty_ThreadSearchParams | null }>()
);
export const actionGetThreadsSuccess = createAction(
    `${threadsKey} Get Threads Success`,
    props<{ threads: PipeProperty_Thread[] }>()
);
export const actionGetThreadsError = createAction(
    `${threadsKey} Get Threads Failure`,
    props<{ errorLoadingThreads: HttpErrorResponse }>()
);

// Create actions
export const actionCreatePipeProperty_Thread = createAction(
    `${threadsKey} Create PipeProperty_Thread`,
    props<{ threadCreate: PipeProperty_ThreadCreate }>()
);
export const actionCreatePipeProperty_ThreadSuccess = createAction(
    `${threadsKey} Create PipeProperty_Thread Success`,
    props<{ thread: PipeProperty_Thread }>()
);
export const actionCreatePipeProperty_ThreadError = createAction(
    `${threadsKey} Create PipeProperty_Thread Error`,
    props<{ errorCreatingThread: HttpErrorResponse }>()
);

// Update actions
export const actionUpdatePipeProperty_Thread = createAction(
    `${threadsKey} Update PipeProperty_Thread`,
    props<{ id: string; thread: PipeProperty_Thread }>()
);
export const actionUpdatePipeProperty_ThreadSuccess = createAction(
    `${threadsKey} Update PipeProperty_Thread Success`,
    props<{ id: string; thread: PipeProperty_Thread }>()
);
export const actionUpdatePipeProperty_ThreadError = createAction(
    `${threadsKey} Update PipeProperty_Thread Error`,
    props<{ errorUpdatingThread: HttpErrorResponse }>()
);

// Reset notifications
export const resetThreadNotifications = createAction(`${threadsKey} Reset Thread Notifications`);
