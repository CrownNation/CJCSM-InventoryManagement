import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { PipeProperty_Grade, PipeProperty_GradeCreate, PipeProperty_GradeSearchParams } from "src/app/models/pipe.model";

export const gradesKey = '[Pipe Properties Grade]';

// Get actions
export const actionGetGrades = createAction(
    `${gradesKey} Get Grades`,
    props<{ searchParams: PipeProperty_GradeSearchParams | null }>()
);
export const actionGetGradesSuccess = createAction(
    `${gradesKey} Get Grades Success`,
    props<{ grades: PipeProperty_Grade[] }>()
);
export const actionGetGradesError = createAction(
    `${gradesKey} Get Grades Failure`,
    props<{ errorLoadingGrades: HttpErrorResponse }>()
);

// Create actions
export const actionCreatePipeProperty_Grade = createAction(
    `${gradesKey} Create PipeProperty_Grade`,
    props<{ gradeCreate: PipeProperty_GradeCreate }>()
);
export const actionCreatePipeProperty_GradeSuccess = createAction(
    `${gradesKey} Create PipeProperty_Grade Success`,
    props<{ grade: PipeProperty_Grade }>()
);
export const actionCreatePipeProperty_GradeError = createAction(
    `${gradesKey} Create PipeProperty_Grade Error`,
    props<{ errorCreatingGrade: HttpErrorResponse }>()
);

// Update actions
export const actionUpdatePipeProperty_Grade = createAction(
    `${gradesKey} Update PipeProperty_Grade`,
    props<{ id: string; grade: PipeProperty_Grade }>()
);
export const actionUpdatePipeProperty_GradeSuccess = createAction(
    `${gradesKey} Update PipeProperty_Grade Success`,
    props<{ id: string; grade: PipeProperty_Grade }>()
);
export const actionUpdatePipeProperty_GradeError = createAction(
    `${gradesKey} Update PipeProperty_Grade Error`,
    props<{ errorUpdatingGrade: HttpErrorResponse }>()
);

//Reset notifcations
export const resetGradeNotifications = createAction(`${gradesKey} Reset Grade Notifications`);
