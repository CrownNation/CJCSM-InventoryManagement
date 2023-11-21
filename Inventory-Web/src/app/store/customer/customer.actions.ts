import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Customer, CustomerCreate } from '../../models/customer.model';

export const customerKey = '[Customer]';

// Get Racks
export const actionGetCustomers = createAction(
    `${customerKey} Get Customers`
);
export const actionGetCustomersSuccess = createAction(
    `${customerKey} Get Customers Success`,
    props<{ customers: Customer[] }>()
);
export const actionGetCustomersError = createAction(
    `${customerKey} Get Customers Error`,
    props<{ errorLoadingCustomers: HttpErrorResponse }>()
);

// Get Rack By Id
export const actionGetCustomerById = createAction(
    `${customerKey} Get Customer By Id`,
    props<{ customerId: string }>()
);


// Create Rack
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



// Delete Rack
export const actionDeleteCustomer = createAction(
    `${customerKey} Delete Customer`, 
    props<{ id: string }>()
);