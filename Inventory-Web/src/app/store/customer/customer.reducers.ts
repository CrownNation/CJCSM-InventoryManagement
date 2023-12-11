import { Action, ActionReducer, createReducer, on} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Customer } from '../../models/customer.model';
import { CustomerState } from './customer.state';
import { actionCreateCustomer, actionCreateCustomerError, actionCreateCustomerSuccess,
    actionGetCustomerById, actionGetCustomerByIdError, actionGetCustomerByIdSuccess,
    actionGetCustomers, actionGetCustomersError, actionGetCustomersFullList, actionGetCustomersFullListError,
    actionGetCustomersFullListSuccess, actionGetCustomersSuccess }
    from './customer.actions';

export function sortByName(a: Customer, b: Customer): number {
    return a.name.localeCompare(b.name);
  }

export const selectId = ({ customerId }: Customer) => customerId;

export const customerAdapater: EntityAdapter<Customer> = createEntityAdapter<Customer>({
    sortComparer: sortByName,
    selectId: selectId
});

export const initialState: CustomerState = customerAdapater.getInitialState({
ids: [],
entities: { },
loadingCustomers: false,
errorLoadingCustomers: null,

creatingCustomer: false,
errorCreatingCustomer: null,

selectedCustomer: null,
errorLoadingSelectedCustomer: null,

customersFullList: null,
errorLoadingCustomersList: null,
});

const reducer: ActionReducer<CustomerState> = createReducer(
    initialState,
    // Retrieve Customers
    on(actionGetCustomers, (state: CustomerState, { searchParams }) => {
        const newState = customerAdapater.removeAll(state); // Needed so it refreshes the subscription fires with new data
        return {
          ...newState,
          loadingCustomers: true,
          errorLoadingCustomers: null
        };
    }),
    on(actionGetCustomersSuccess, (state: CustomerState, { customers }) => {
        return customerAdapater.addMany(customers, {
          ...state,
          loadingcustomers: false,
          errorLoadingCustomers: null
        });
    }),
    on(actionGetCustomersError, (state: CustomerState, { errorLoadingCustomers }) => ({
        ...state,
        loadingCustomers: false,
        errorLoadingCustomers
    })),

    // Create Customer
    on(actionCreateCustomer, (state: CustomerState, { customerCreate }) => ({
        ...state,
        creatingCustomer: true,
        errorCreatingCustomer: null
    })),
    on(actionCreateCustomerSuccess, (state: CustomerState, { customer }) => {
        return customerAdapater.addOne(customer, {
          ...state,
          creatingCustomer: false,
          errorCreatingCustomer: null
        });
      }),
    on(actionCreateCustomerError, (state: CustomerState, { errorCreatingCustomer }) => ({
        ...state,
        creatingCustomer: false,
        errorCreatingCustomer
    })),

    // Load selected customer
    on(actionGetCustomerById, (state: CustomerState, { customerId }) => ({
        ...state,
        selectedCustomer: null,
        errorLoadingSelectedCustomer: null
    })),
    on(actionGetCustomerByIdSuccess, (state: CustomerState, { selectedCustomer }) => ({
        ...state,
        selectedCustomer,
        errorLoadingSelectedCustomer: null
    })),
    on(actionGetCustomerByIdError, (state: CustomerState, { errorLoadingSelectedCustomer }) => ({
        ...state,
        errorLoadingSelectedCustomer
    })),

    // Retrieve Customers Full List
    on(actionGetCustomersFullList, (state: CustomerState, { searchParams }) => ({
        ...state,
        customersFullList: null,
        errorLoadingCustomersList: null
    })),
    on(actionGetCustomersFullListSuccess, (state: CustomerState, { customersFullList }) => ({
        ...state,
        customersFullList,
        errorLoadingCustomersList: null
    })),
    on(actionGetCustomersFullListError, (state: CustomerState, { errorLoadingCustomersList }) => ({
        ...state,
        errorLoadingCustomersList
    })),


);

export function customerReducers(state: CustomerState | undefined, action: Action) {
    return reducer(state, action);
}