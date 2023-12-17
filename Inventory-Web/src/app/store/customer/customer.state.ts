import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from '@ngrx/entity';
import { Customer, CustomerWithPipe } from '../../models/customer.model';


export interface CustomerState extends EntityState<any> {
    loadingCustomers: boolean;
    errorLoadingCustomers: HttpErrorResponse | null;

    creatingCustomer: boolean,
    createdCustomer: Customer | null,
    errorCreatingCustomer: HttpErrorResponse | null,

    selectedCustomer: CustomerWithPipe | null;
    errorLoadingSelectedCustomer: HttpErrorResponse | null

    customersFullList: Customer[] | null;
    errorLoadingCustomersList: HttpErrorResponse | null;
}
