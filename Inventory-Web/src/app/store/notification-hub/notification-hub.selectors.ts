import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotificationState } from './notification-hub.reducers';
import { AppState } from '../core.state';

export const selectNotificationFeature = createFeatureSelector<AppState, NotificationState>('notification');

export const selectNotifications = createSelector(
  selectNotificationFeature,
  (state: NotificationState) => state.notifications
);
