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
import { pipeProperty_CategoryReducers } from './pipe-properties/pipe-property-category/pipe-property-category.reducers';
import { NotificationState, notificationHubReducer } from './notification-hub/notification-hub.reducers';
import { ShopLocationState } from './shop-location/shop-location.state';
import { shopLocationReducers } from './shop-location/shop-location.reducers';
import { PipeDefinition, PipeProperties } from '../models/pipe.model';
import { PipePropertiesState } from './pipe-properties/pipe-properties/pipe-properties.state';
import { pipePropertiesReducers } from './pipe-properties/pipe-properties/pipe-properties.reducers';
import { PipeDefinitionState } from './pipe-definition/pipe-definition.state';
import { pipeDefinitionReducer } from './pipe-definition/pipe-definition.reducers';
import { EquipmentDefinitionState } from './equipment-definition/equipment-definition.state';
import { equipmentDefinitionReducer } from './equipment-definition/equipment-definition.reducers';

export const reducers: ActionReducerMap<AppState> = {
  // auth: authReducer,
  // settings: settingsReducer,
  // router: routerReducer,
  rack: rackReducers,
  tally: tallyReducers,
  customer: customerReducers,
  pipe: pipeReducers,
  notification: notificationHubReducer,
  shopLocation: shopLocationReducers,
  pipeProperties: pipePropertiesReducers,
  pipeDefinition: pipeDefinitionReducer,
  equipmentDefinition: equipmentDefinitionReducer
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromLocalStorage,
  initStateFromSessionStorage
];



// export const selectRack = createFeatureSelector<AppState, RackState>('rack');
export const selectRackFeature: MemoizedSelector<AppState, RackState> =
  createFeatureSelector<RackState>('rack');

export const selectTallyFeature: MemoizedSelector<AppState, TallyState> =
  createFeatureSelector<TallyState>('tally');

export const selectCustomerFeature: MemoizedSelector<AppState, CustomerState> =
  createFeatureSelector<CustomerState>('customer');

export const selectPipeFeature: MemoizedSelector<AppState, PipeState> =
  createFeatureSelector<PipeState>('pipe');

export const selectNotificationFeature: MemoizedSelector<AppState, NotificationState> = createFeatureSelector<NotificationState>('notification');

export const selectShopLocationFeature: MemoizedSelector<AppState, ShopLocationState> =
  createFeatureSelector<ShopLocationState>('shopLocation');

export const selectPipeDefinitionFeature: MemoizedSelector<AppState, PipeDefinitionState> =
  createFeatureSelector<PipeDefinitionState>('pipeDefinition');

export const selectEquipmentDefinitionFeature: MemoizedSelector<AppState, EquipmentDefinitionState> =
  createFeatureSelector<EquipmentDefinitionState>('equipmentDefinition');

export const selectPipeProperty_CategoryFeature: MemoizedSelector<AppState, PipeProperty_CategoryState> =
  createFeatureSelector<PipeProperty_CategoryState>('pipeProperty_Category');

export interface AppState {
  // auth: AuthState;
  // settings: SettingsState;
  // router: RouterReducerState<RouterStateUrl>;
  rack: RackState;
  tally: TallyState;
  customer: CustomerState,
  pipe: PipeState,
  notification: NotificationState,
  shopLocation: ShopLocationState,
  pipeProperties: PipePropertiesState,
  pipeDefinition: PipeDefinitionState,
  equipmentDefinition: EquipmentDefinitionState
}
