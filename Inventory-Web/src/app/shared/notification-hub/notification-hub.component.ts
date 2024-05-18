import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/core.state';
import { selectNotifications } from '../../store/notification-hub/notification-hub.selectors';
import { AppNotification } from '../../models/app-notification.model';

@Component({
  selector: 'app-notification-hub',
  templateUrl: './notification-hub.component.html',
  styleUrls: ['./notification-hub.component.scss']
})
export class NotificationHubComponent {
  notifications$: Observable<AppNotification[]>;

  constructor(private store: Store<AppState>) {
    this.notifications$ = this.store.select(selectNotifications);
  }
}
