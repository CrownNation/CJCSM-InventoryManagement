import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';
import { Tally } from '../../models/tally.model';


export interface TallyState extends EntityState<Tally> {
    loadingTallies: boolean;
    errorLoadingTallies: HttpErrorResponse | null;

    creatingTally: boolean,
    errorCreatingTally: HttpErrorResponse | null,

    selectedTally: Tally | null,
    errorLoadingSelectedTally: HttpErrorResponse | null
}


