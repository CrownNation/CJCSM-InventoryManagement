import { HttpErrorResponse } from "@angular/common/http";
import { EntityState } from "@ngrx/entity";
import { PipeProperty_Thread } from "src/app/models/pipe.model";

// Extend the EntityState to include the specific entity and additional properties
export interface PipeProperty_ThreadState extends EntityState<PipeProperty_Thread> {
    loadingThreads: boolean; // Flag to track whether threads are currently being loaded
    errorLoadingThreads: HttpErrorResponse | null; // Any error that occurs during the loading of threads

    creatingThread: boolean; // Tracks whether a create operation for a thread is in progress
    createdThread: PipeProperty_Thread | null; // Stores the thread object that was recently created
    errorCreatingThread: HttpErrorResponse | null; // Any error that occurs during the creation of a thread

    updatingThread: boolean; // Tracks whether an update operation for a thread is in progress
    updatedThread: PipeProperty_Thread | null; // Stores the thread object that was most recently updated
    errorUpdatingThread: HttpErrorResponse | null; // Any error that occurs during the update of a thread

    selectedThread: PipeProperty_Thread | null; // Stores the thread object that is currently selected
    errorLoadingSelectedThread: HttpErrorResponse | null; // Any error that occurs during the fetching of the selected thread
}
