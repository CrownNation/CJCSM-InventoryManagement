import {
    ActionReducerMap,
    MemoizedSelector,
    MetaReducer,
    createFeatureSelector
  } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { initStateFromLocalStorage } from '../core/meta-reducers/init-state-from-local-storage.reducer';
import { initStateFromSessionStorage } from '../core/meta-reducers/init-state-from-session-storage.reducer';
import { rackReducers } from './rack/rack.reducers';
import { RackState } from './rack/rack.state';
import { TallyState } from './tally/tally.state';
import { tallyReducers } from './tally/tally.reducers';
import { CustomerState } from './customer/customer.state';
import { customerReducers } from './customer/customer.reducers';
import { PipeState } from './pipe/pipe.state';
import { pipeReducers } from './pipe/pipe.reducers';
import { PipeProperty_CategoryState } from './pipe-properties/pipe-property-category/pipe-property-category.state';


  export const reducers: ActionReducerMap<AppState> = {
    // auth: authReducer,
    // settings: settingsReducer,
    // router: routerReducer,
    rack: rackReducers,
    tally: tallyReducers,
    customer: customerReducers,
    pipe: pipeReducers,
  };

  export const metaReducers: MetaReducer<AppState>[] = [
    initStateFromLocalStorage,
    initStateFromSessionStorage
  ];

//   if (!environment.production) {
//     if (!environment.test) {
//       metaReducers.unshift(debug);
//     }
//   }

//   export const selectAuthState = createFeatureSelector<AppState, AuthState>(
//     'auth'
//   );

//   export const selectSettingsState = createFeatureSelector<
//     AppState,
//     SettingsState
//   >('settings');

//   export const selectRouterState = createFeatureSelector<
//     AppState,
//     RouterReducerState<RouterStateUrl>
//   >('router');

//   export const selectRack = createFeatureSelector<
//     AppState,
//     RackState
//     >('rack');

// export const selectRack = createFeatureSelector<AppState, RackState>('rack');
export const selectRackFeature: MemoizedSelector<AppState, RackState> =
  createFeatureSelector<RackState>('rack');

export const selectTallyFeature: MemoizedSelector<AppState, TallyState> =
  createFeatureSelector<TallyState>('tally');

export const selectCustomerFeature: MemoizedSelector<AppState, CustomerState> =
  createFeatureSelector<CustomerState>('customer');

  export const selectPipeFeature: MemoizedSelector<AppState, PipeState> =
  createFeatureSelector<PipeState>('pipe');

  export interface AppState {
    // auth: AuthState;
    // settings: SettingsState;
    // router: RouterReducerState<RouterStateUrl>;
    rack: RackState;
    tally: TallyState;
    customer: CustomerState,
    pipe: PipeState,
    pipeProperty_Category: PipeProperty_CategoryState
  }
