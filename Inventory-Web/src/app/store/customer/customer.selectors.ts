import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, selectCustomerFeature } from "../core.state";
import { CustomerState } from "./customer.state";
import { Customer } from "../../models/customer.model";
import { customerAdapater } from "./customer.reducers";
import { Dictionary } from "@ngrx/entity";


const { selectEntities, selectAll } = customerAdapater.getSelectors();

export const selectCustomerFeature2: MemoizedSelector<AppState, CustomerState> =
  createFeatureSelector<CustomerState>('customer');

export const selectCustomers2: MemoizedSelector<AppState, Customer[]> =
createSelector(
    selectCustomerFeature2,
  ({ entities }: CustomerState): Customer[] =>
    Object.values(entities) as Customer[]
);

export const selectCustomerState = createSelector(
    selectCustomerFeature,
    (state: CustomerState) => state
);

export const selectAllCustomers = createSelector(selectCustomerFeature, selectAll);
export const selectAllCustomerEntities = createSelector(selectCustomerFeature, selectEntities);


export const selectCustomers = createSelector(
    selectAllCustomerEntities,
    (customersDictionary: Dictionary<Customer>) => Object.values(customersDictionary) as Customer[]
);
export const selectLoadingCustomers = createSelector(
    selectCustomerFeature,
    (state: CustomerState) => state.loadingCustomers
);
export const selectErrorLoadingCustomers = createSelector(
    selectCustomerFeature,
    (state: CustomerState) => state.errorLoadingCustomers
);

// Selected Customer
export const selectSelectedCustomer = createSelector(
    selectCustomerFeature,
    (state: CustomerState) => state.selectedCustomer
  );
export const selectSelectedCustomerError = createSelector(
    selectCustomerFeature,
    (state: CustomerState) => state.errorLoadingSelectedCustomer
);


// Full customer list
export const selectCustomersFullList = createSelector(
    selectCustomerFeature,
    (state: CustomerState) => state.customersFullList
  );
export const selectCustomersFullListError = createSelector(
    selectCustomerFeature,
    (state: CustomerState) => state.errorLoadingCustomersList
);