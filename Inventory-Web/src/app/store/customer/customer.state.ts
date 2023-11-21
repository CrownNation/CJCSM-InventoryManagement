import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';


export interface CustomerState extends EntityState<any> {
    loadingCustomers: boolean;
    errorLoadingCustomers: HttpErrorResponse | null;

    creatingCustomer: boolean,
    errorCreatingCustomer: HttpErrorResponse | null,
}
