import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CustomerService } from "../../core/services/customer-service/customer.service";
import { actionCreateCustomer, actionCreateCustomerError, actionCreateCustomerSuccess, 
  actionGetCustomerById, 
  actionGetCustomerByIdError, 
  actionGetCustomerByIdSuccess, 
  actionGetCustomers, actionGetCustomersError, actionGetCustomersFullList, actionGetCustomersFullListError, actionGetCustomersFullListSuccess, actionGetCustomersSuccess } from "./customer.actions";

@Injectable()
export class CustomerEffects {

  constructor(
      private actions$: Actions,
      private customerService: CustomerService,
  ) {}


  retrieveCustomers = createEffect( () =>
    this.actions$.pipe(
      ofType(actionGetCustomers),
      switchMap(actionData =>
        this.customerService.getCustomers(actionData.searchParams).pipe(
          map(customers => actionGetCustomersSuccess({ customers })),
          catchError(errorLoadingCustomers => of(actionGetCustomersError({ errorLoadingCustomers })))
        )
      )
    )
  );

  createCustomer = createEffect( () =>
    this.actions$.pipe(
      ofType(actionCreateCustomer),
      switchMap(data =>
        this.customerService.addCustomer(data.customerCreate).pipe(
          map(customer => actionCreateCustomerSuccess({customer})),
          catchError(errorCreatingCustomer => of(actionCreateCustomerError({ errorCreatingCustomer })))
        )
      )
    )
  );

  
  retrieveCustomerById = createEffect( () =>
    this.actions$.pipe(
      ofType(actionGetCustomerById),    
      switchMap(actionData =>
        this.customerService.getCustomerById(actionData.customerId).pipe(
          map(selectedCustomer => actionGetCustomerByIdSuccess({ selectedCustomer })),
          catchError(errorLoadingSelectedCustomer => of(actionGetCustomerByIdError({ errorLoadingSelectedCustomer })))
        )
      )
    )
  );


  retrieveCustomersFullList = createEffect( () =>
    this.actions$.pipe(
      ofType(actionGetCustomersFullList),
      switchMap(actionData =>
        this.customerService.getCustomers(actionData.searchParams).pipe(
          map(customersFullList => actionGetCustomersFullListSuccess({ customersFullList })),
          catchError(errorLoadingCustomersList => of(actionGetCustomersFullListError({ errorLoadingCustomersList })))
        )
      )
    )
  );


}