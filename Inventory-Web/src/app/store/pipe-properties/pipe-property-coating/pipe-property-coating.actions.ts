import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { PipeProperty_Coating, PipeProperty_CoatingCreate, PipeProperty_CoatingSearchParams } from "src/app/models/pipe.model";

export const coatingsKey = '[Pipe Properties Coating]';

// Get actions
export const actionGetCoatings = createAction(
    `${coatingsKey} Get Coatings`,
    props<{ searchParams: PipeProperty_CoatingSearchParams | null}>()
);
export const actionGetCoatingsSuccess = createAction(
    `${coatingsKey} Get Coatings Success`,
    props<{ coatings: PipeProperty_Coating[] }>() 
);
export const actionGetCoatingsError = createAction(
    `${coatingsKey} Get Coatings Failure`,
    props<{ errorLoadingCoatings: HttpErrorResponse }>()
);

// Create actions
export const actionCreatePipeProperty_Coating = createAction(
    `${coatingsKey} Create PipeProperty_Coating`,
    props<{ coatingCreate: PipeProperty_CoatingCreate }>()
);
export const actionCreatePipeProperty_CoatingSuccess = createAction(
    `${coatingsKey} Create PipeProperty_Coating Success`,
    props<{ coating: PipeProperty_Coating }>()
);
export const actionCreatePipeProperty_CoatingError = createAction(
    `${coatingsKey} Create PipeProperty_Coating Error`,
    props<{ errorCreatingCoating: HttpErrorResponse }>()
);

// Update actions
export const actionUpdatePipeProperty_Coating = createAction(
    `${coatingsKey} Update PipeProperty_Coating`,
    props<{ id: string; coating: PipeProperty_Coating }>()
);

export const actionUpdatePipeProperty_CoatingSuccess = createAction(
    `${coatingsKey} Update PipeProperty_Coating Success`,
    props<{ id: string; coating: PipeProperty_Coating }>()
);

export const actionUpdatePipeProperty_CoatingError = createAction(
    `${coatingsKey} Update PipeProperty_Coating Error`,
    props<{ error: HttpErrorResponse }>()
); 
