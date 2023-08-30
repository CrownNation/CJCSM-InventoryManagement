import {
    ActionReducerMap,
    MemoizedSelector,
    MetaReducer,
    createFeatureSelector
  } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { environment } from 'src/environments/environment';
import { initStateFromLocalStorage } from '../core/meta-reducers/init-state-from-local-storage.reducer';
import { initStateFromSessionStorage } from '../core/meta-reducers/init-state-from-session-storage.reducer';
import { rackReducers } from './rack/rack.reducers';
import { RackState } from './rack/rack.state';

//   import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
//   import { initStateFromSessionStorage } from './meta-reducers/init-state-from-session-storage.reducer';
//   import { AuthState } from './auth/auth.model';
//   import { authReducer } from './auth/auth.reducer';
//   import { RouterStateUrl } from './router/router.state';
//   import { settingsReducer } from './settings/settings.reducer';
//   import { SettingsState } from './settings/settings.model';
//   import { dashboardReducer } from '../dashboard/dashboard.reducer';
//   import { DashboardState } from '../dashboard/dashboard.state';


  export const reducers: ActionReducerMap<AppState> = {
    // auth: authReducer,
    // settings: settingsReducer,
    // router: routerReducer,
    rack: rackReducers
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

  export interface AppState {
    // auth: AuthState;
    // settings: SettingsState;
    // router: RouterReducerState<RouterStateUrl>;
    rack: RackState;
  }
