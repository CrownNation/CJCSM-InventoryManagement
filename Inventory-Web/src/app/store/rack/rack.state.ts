import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';


export interface RackState extends EntityState<any> {
    loadingRacks: boolean;
    errorLoadingRacks: HttpErrorResponse | null;

    creatingRack: boolean,
    errorCreatingRack: HttpErrorResponse | null,
}


