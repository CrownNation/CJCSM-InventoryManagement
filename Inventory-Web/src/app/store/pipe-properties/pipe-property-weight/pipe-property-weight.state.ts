import { HttpErrorResponse } from "@angular/common/http";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { PipeProperty_Weight } from "src/app/models/pipe.model";

// Define the interface for the state
export interface PipeProperty_WeightState extends EntityState<PipeProperty_Weight> {
    loadingWeights: boolean; // Flag to track whether weights are currently being loaded
    errorLoadingWeights: HttpErrorResponse | null; // Any error that occurs during the loading of weights

    creatingWeight: boolean; // Tracks whether a create operation for a weight is in progress
    createdWeight: PipeProperty_Weight | null; // Stores the weight object that was recently created
    errorCreatingWeight: HttpErrorResponse | null; // Any error that occurs during the creation of a weight

    updatingWeight: boolean; // Tracks whether an update operation for a weight is in progress
    updatedWeight: PipeProperty_Weight | null; // Stores the weight object that was most recently updated
    errorUpdatingWeight: HttpErrorResponse | null; // Any error that occurs during the update of a weight

    selectedWeight: PipeProperty_Weight | null; // Stores the weight object that is currently selected
    errorLoadingSelectedWeight: HttpErrorResponse | null; // Any error that occurs during the fetching of the selected weight
}
