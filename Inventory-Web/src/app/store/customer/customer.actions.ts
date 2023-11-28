import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Customer, CustomerCreate, CustomerSearchParams, CustomerWithPipe } from '../../models/customer.model';

export const customerKey = '[Customer]';

// Get Customers
export const actionGetCustomers = createAction(
    `${customerKey} Get Customers`,
    props<{ searchParams: CustomerSearchParams | null}>()
);
export const actionGetCustomersSuccess = createAction(
    `${customerKey} Get Customers Success`,
    props<{ customers: Customer[] }>()
);
export const actionGetCustomersError = createAction(
    `${customerKey} Get Customers Error`,
    props<{ errorLoadingCustomers: HttpErrorResponse }>()
);


// Create Customer
export const actionCreateCustomer = createAction(
    `${customerKey} Create Customer`, 
    props<{ customerCreate: CustomerCreate }>()
);
export const actionCreateCustomerSuccess = createAction(
    `${customerKey} Create Customer Success`,
    props<{ customer: Customer }>()
);
export const actionCreateCustomerError = createAction(
    `${customerKey} Create Customer Error`,
    props<{ errorCreatingCustomer: HttpErrorResponse }>()
);


// Get Tally by Id
export const actionGetCustomerById = createAction(
    `${customerKey} Get Customer By Id`, 
    props<{ customerId: string }>()
);
export const actionGetCustomerByIdSuccess = createAction(
    `${customerKey} Get Customer By Id Success`,
    props<{ selectedCustomer: CustomerWithPipe }>()
);
export const actionGetCustomerByIdError = createAction(
    `${customerKey} Get Customer By Id Error`,
    props<{ errorLoadingSelectedCustomer: HttpErrorResponse }>()
);

// Get Full Customer List
export const actionGetCustomersFullList = createAction(
    `${customerKey} Get Customers Full List`,
    props<{ searchParams: CustomerSearchParams | null}>()
);
export const actionGetCustomersFullListSuccess = createAction(
    `${customerKey} Get Customers Full List Success`,
    props<{ customersFullList: Customer[] | null}>()
);
export const actionGetCustomersFullListError = createAction(
    `${customerKey} Get Customers Full List Error`,
    props<{ errorLoadingCustomersList: HttpErrorResponse }>()
);
