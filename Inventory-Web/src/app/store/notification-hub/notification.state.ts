import { AppNotification } from "src/app/models/app-notification.model";

export interface NotificationState {
  notifications: AppNotification[];
}

// Initial state
export const initialNotificationState: NotificationState = {
  notifications: []
};