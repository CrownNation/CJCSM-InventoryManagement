import { HttpErrorResponse } from "@angular/common/http";
import { EntityState } from "@ngrx/entity";
import { PipeProperty_Grade } from "src/app/models/pipe.model";

// Extend the EntityState to include the specific entity and additional properties
export interface PipeProperty_GradeState extends EntityState<PipeProperty_Grade> {
    loadingGrades: boolean; // Flag to track whether grades are currently being loaded
    errorLoadingGrades: HttpErrorResponse | null; // Any error that occurs during the loading of grades

    creatingGrade: boolean; // Tracks whether a create operation for a grade is in progress
    createdGrade: PipeProperty_Grade | null; // Stores the grade object that was recently created
    errorCreatingGrade: HttpErrorResponse | null; // Any error that occurs during the creation of a grade

    updatingGrade: boolean; // Tracks whether an update operation for a grade is in progress
    updatedGrade: PipeProperty_Grade | null; // Stores the grade object that was most recently updated
    errorUpdatingGrade: HttpErrorResponse | null; // Any error that occurs during the update of a grade

    selectedGrade: PipeProperty_Grade | null; // Stores the grade object that is currently selected
    errorLoadingSelectedGrade: HttpErrorResponse | null; // Any error that occurs during the fetching of the selected grade
}
