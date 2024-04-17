import { HttpErrorResponse } from "@angular/common/http";
import { EntityState } from "@ngrx/entity";
import { PipeProperty_Condition } from "src/app/models/pipe.model";  // Make sure this model exists

export interface PipeProperty_ConditionState extends EntityState<PipeProperty_Condition> {
    loadingConditions: boolean; // Flag whether we are in the middle of loading conditions
    errorLoadingConditions: HttpErrorResponse | null; // Any error that happens during loading.

    creatingCondition: boolean; // Tracks whether a create operation is in progress
    createdCondition: PipeProperty_Condition | null; // Holds the created object
    errorCreatingCondition: HttpErrorResponse | null; // Holds any error response

    updatingCondition: boolean; // Tracks whether an update operation is in progress
    updatedCondition: PipeProperty_Condition | null; // Holds the last updated condition
    errorUpdatingCondition: HttpErrorResponse | null; // Holds any error that occurred during updating

    selectedCondition: PipeProperty_Condition | null; // The condition object that is selected on the site.
    errorLoadingSelectedCondition: HttpErrorResponse | null; // Error getting the selected condition object.
}
