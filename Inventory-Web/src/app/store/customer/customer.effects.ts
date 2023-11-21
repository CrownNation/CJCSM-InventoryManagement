import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CustomerService } from "../../core/services/customer.service";
import { actionCreateCustomer, actionCreateCustomerError, actionCreateCustomerSuccess, 
  actionGetCustomers, actionGetCustomersError, actionGetCustomersSuccess } from "./customer.actions";

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
        this.customerService.getCustomers().pipe(
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


}