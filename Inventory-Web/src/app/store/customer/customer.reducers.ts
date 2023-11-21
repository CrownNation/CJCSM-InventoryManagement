import { Action, ActionReducer, createReducer, on} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Customer } from '../../models/customer.model';
import { CustomerState } from './customer.state';
import { actionCreateCustomer, actionCreateCustomerError, actionCreateCustomerSuccess, 
    actionGetCustomers, actionGetCustomersError, actionGetCustomersSuccess } from './customer.actions';



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
});

const reducer: ActionReducer<CustomerState> = createReducer(
    initialState,
    // Retrieve Customers
    on(actionGetCustomers, (state: CustomerState, { }) => ({
        ...state,
        loadingRacks: true,
        errorLoadingRacks: null
    })),
    on(actionGetCustomersSuccess, (state: CustomerState, { customers }) => 
        customerAdapater.addMany(customers, state),        
    ),
    on(actionGetCustomersSuccess, (state: CustomerState, { customers }) => ({
        ...state,
        loadingCustomers: false,
        errorLoadingCustomers: null
    })),        
    on(actionGetCustomersError, (state: CustomerState, { errorLoadingCustomers }) => ({
        ...state,
        loadingRacks: false,
        errorLoadingCustomers
    })),

    // Create Customer
    on(actionCreateCustomer, (state: CustomerState, { customerCreate }) => ({
        ...state,
        creatingCustomer: true,
        errorCreatingCustomer: null
    })),
    on(actionCreateCustomerSuccess, (state: CustomerState, { customer }) => 
        customerAdapater.addOne(customer, state),        
    ),
    on(actionCreateCustomerSuccess, (state: CustomerState, { customer }) => ({
        ...state,
        creatingCustomer: false,
        errorCreatingCustomer: null
    })),        
    on(actionCreateCustomerError, (state: CustomerState, { errorCreatingCustomer }) => ({
        ...state,
        loadincreatingRackCustomers: false,
        errorCreatingCustomer
    })),

);

export function customerReducers(state: CustomerState | undefined, action: Action) {
    return reducer(state, action);
}