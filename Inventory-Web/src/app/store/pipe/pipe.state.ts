import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';
import { Pipe, PipeDefinition } from '../../models/pipe.model';


export interface PipeState extends EntityState<any> {
    loadingPipe: boolean;
    errorLoadingPipe: HttpErrorResponse | null;

    creatingPipe: boolean,
    errorCreatingPipe: HttpErrorResponse | null,

    selectedPipe: Pipe | null;
    errorLoadingSelectedPipe: HttpErrorResponse | null
}
