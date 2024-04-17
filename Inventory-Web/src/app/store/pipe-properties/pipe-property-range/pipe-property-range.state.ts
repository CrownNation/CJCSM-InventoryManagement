import { HttpErrorResponse } from "@angular/common/http";
import { EntityState } from "@ngrx/entity";
import { PipeProperty_Range } from "src/app/models/pipe.model";

// Extend the EntityState to include the specific entity and additional properties
export interface PipeProperty_RangeState extends EntityState<PipeProperty_Range> {
    loadingRanges: boolean; // Flag to track whether ranges are currently being loaded
    errorLoadingRanges: HttpErrorResponse | null; // Any error that occurs during the loading of ranges

    creatingRange: boolean; // Tracks whether a create operation for a range is in progress
    createdRange: PipeProperty_Range | null; // Stores the range object that was recently created
    errorCreatingRange: HttpErrorResponse | null; // Any error that occurs during the creation of a range

    updatingRange: boolean; // Tracks whether an update operation for a range is in progress
    updatedRange: PipeProperty_Range | null; // Stores the range object that was most recently updated
    errorUpdatingRange: HttpErrorResponse | null; // Any error that occurs during the update of a range

    selectedRange: PipeProperty_Range | null; // Stores the range object that is currently selected
    errorLoadingSelectedRange: HttpErrorResponse | null; // Any error that occurs during the fetching of the selected range
}
