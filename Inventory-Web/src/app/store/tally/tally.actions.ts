import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Tally, DtoTallyCreate, TallySearchParams } from '../../models/tally.model';

export const tallyKey = '[Tally]';

// Get Tallies
export const actionGetTallies = createAction(
    `${tallyKey} Get Tallies`,
    props<{ searchParams: TallySearchParams | null}>()
);
export const actionGetTalliesSuccess = createAction(
    `${tallyKey} Get Tallies Success`,
    props<{ tallies: Tally[] }>()
);
export const actionGetTalliesError = createAction(
    `${tallyKey} Get Tallies Error`,
    props<{ errorLoadingTallies: HttpErrorResponse }>()
);


// Create Tally
export const actionCreateTally = createAction(
    `${tallyKey} Create Tally`, 
    props<{ tallyCreate: DtoTallyCreate }>()
);
export const actionCreateTallySuccess = createAction(
    `${tallyKey} Create Tally Success`,
    props<{ tally: Tally }>()
);
export const actionCreateTallyError = createAction(
    `${tallyKey} Create Tally Error`,
    props<{ errorCreatingTally: HttpErrorResponse }>()
);

// Get Tally by Id
export const actionGetTallyById = createAction(
    `${tallyKey} Get Tally By Id`, 
    props<{ tallyId: string }>()
);
export const actionGetTallyByIdSuccess = createAction(
    `${tallyKey} Get Tally By Id Success`,
    props<{ selectedTally: Tally }>()
);
export const actionGetTallyByIdError = createAction(
    `${tallyKey} Get Tally By Id Error`,
    props<{ errorLoadingSelectedTally: HttpErrorResponse }>()
);



// Delete Tally
export const actionDeleteTally = createAction(
    `${tallyKey} Delete Tally`, 
    props<{ id: string }>()
);