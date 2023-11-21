import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';


export interface TallyState extends EntityState<any> {
    loadingTallies: boolean;
    errorLoadingTallies: HttpErrorResponse | null;

    creatingTally: boolean,
    errorCreatingTally: HttpErrorResponse | null,
}


