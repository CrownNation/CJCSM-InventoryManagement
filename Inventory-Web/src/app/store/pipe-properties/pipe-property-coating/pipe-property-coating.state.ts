import { HttpErrorResponse } from "@angular/common/http";
import { EntityState } from "@ngrx/entity";
import { PipeProperty_Coating} from "src/app/models/pipe.model";


export interface PipeProperty_CoatingState extends EntityState<PipeProperty_Coating> {
    loadingCoatings: boolean; // Flag whether we are in the middle of loading coatings
    errorLoadingCoatings: HttpErrorResponse | null; // Any error that happens during loading.

    creatingCoating: boolean; // Tracks whether a create operation is in progress
    createdCoating: PipeProperty_Coating | null; // Holds the created object
    errorCreatingCoating: HttpErrorResponse | null; // Holds any error response

    updatingCoating: boolean; // Tracks whether an update operation is in progress
    updatedCoating: PipeProperty_Coating | null; // Holds the last updated coating
    errorUpdatingCoating: HttpErrorResponse | null; // Holds any error that occurred during updating

    selectedCoating: PipeProperty_Coating | null; // The coating object that is selected on the site.
    errorLoadingSelectedCoating: HttpErrorResponse | null; // Error getting the selected coating objectg.
}


