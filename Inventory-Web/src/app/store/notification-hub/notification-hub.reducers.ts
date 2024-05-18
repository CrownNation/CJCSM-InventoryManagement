import { createReducer, on } from '@ngrx/store';
import { addNotification, clearNotifications } from './notification-hub.actions';
import { AppNotification } from 'src/app/models/app-notification.model';

export interface NotificationState {
  notifications: AppNotification[];
}

export const initialState: NotificationState = {
  notifications: []
};

export const notificationHubReducer = createReducer(
  initialState,
  on(addNotification, (state, { notification }) => ({
    ...state,
    notifications: [...state.notifications, notification]
  })),
  on(clearNotifications, (state) => ({
    ...state,
    notifications: []
  }))
);
