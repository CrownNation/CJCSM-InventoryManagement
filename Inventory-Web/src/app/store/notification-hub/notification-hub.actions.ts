import { createAction, props } from '@ngrx/store';
import { AppNotification } from 'src/app/models/app-notification.model';

export const addNotification = createAction(
  '[Notification Hub] Add Notification',
  props<{ notification: AppNotification }>()
);

export const clearNotifications = createAction('[Notification Hub] Clear Notifications');
