import { HttpErrorResponse } from "@angular/common/http";
import { EntityState } from "@ngrx/entity";
import { PipeProperty_Size } from "src/app/models/pipe.model";

// Extend the EntityState to include the specific entity and additional properties
export interface PipeProperty_SizeState extends EntityState<PipeProperty_Size> {
    loadingSizes: boolean; // Flag to track whether sizes are currently being loaded
    errorLoadingSizes: HttpErrorResponse | null; // Any error that occurs during the loading of sizes

    creatingSize: boolean; // Tracks whether a create operation for a size is in progress
    createdSize: PipeProperty_Size | null; // Stores the size object that was recently created
    errorCreatingSize: HttpErrorResponse | null; // Any error that occurs during the creation of a size

    updatingSize: boolean; // Tracks whether an update operation for a size is in progress
    updatedSize: PipeProperty_Size | null; // Stores the size object that was most recently updated
    errorUpdatingSize: HttpErrorResponse | null; // Any error that occurs during the update of a size

    selectedSize: PipeProperty_Size | null; // Stores the size object that is currently selected
    errorLoadingSelectedSize: HttpErrorResponse | null; // Any error that occurs during the fetching of the selected size
}
