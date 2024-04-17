import { HttpErrorResponse } from "@angular/common/http";
import { EntityState } from "@ngrx/entity";
import { PipeProperty_Wall } from "src/app/models/pipe.model";

// Extend the EntityState to include the specific entity and additional properties
export interface PipeProperty_WallState extends EntityState<PipeProperty_Wall> {
    loadingWalls: boolean; // Flag to track whether walls are currently being loaded
    errorLoadingWalls: HttpErrorResponse | null; // Any error that occurs during the loading of walls

    creatingWall: boolean; // Tracks whether a create operation for a wall is in progress
    createdWall: PipeProperty_Wall | null; // Stores the wall object that was recently created
    errorCreatingWall: HttpErrorResponse | null; // Any error that occurs during the creation of a wall

    updatingWall: boolean; // Tracks whether an update operation for a wall is in progress
    updatedWall: PipeProperty_Wall | null; // Stores the wall object that was most recently updated
    errorUpdatingWall: HttpErrorResponse | null; // Any error that occurs during the update of a wall

    selectedWall: PipeProperty_Wall | null; // Stores the wall object that is currently selected
    errorLoadingSelectedWall: HttpErrorResponse | null; // Any error that occurs during the fetching of the selected wall
}
