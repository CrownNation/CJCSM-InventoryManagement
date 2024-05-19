import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/core.state';
import { selectNotifications } from '../../store/notification-hub/notification-hub.selectors';
import { AppNotification } from '../../models/app-notification.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-notification-hub',
  templateUrl: './notification-hub.component.html',
  styleUrls: ['./notification-hub.component.scss'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class NotificationHubComponent {
  notifications$: Observable<AppNotification[]>;

  constructor(private store: Store<AppState>) {
    this.notifications$ = this.store.select(selectNotifications);
  }
}
