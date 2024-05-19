import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { actionGetShopLocations } from '../../store/rack/rack.actions';
import { AppState } from '../../store/core.state';
import { Observable, of } from 'rxjs';
import { actionGetCustomersFullList } from '../../store/customer/customer.actions';
import { actionGetPipeDefinitionsList } from '../../store/pipe/pipe.actions';
import { Router } from '@angular/router';
import { AppNotification } from 'src/app/models/app-notification.model';
import { selectNotifications } from 'src/app/store/notification-hub/notification-hub.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  notifications$: Observable<AppNotification[]> = of([]);
   
  constructor(private store: Store<AppState>, private router: Router) { 
    this.notifications$ = this.store.select(selectNotifications);
  }

  ngOnInit(): void {
    this.store.dispatch(actionGetCustomersFullList({ searchParams: null }));
    this.store.dispatch(actionGetPipeDefinitionsList({ searchParams: null }));
    this.store.dispatch(actionGetShopLocations());
  }

  onTabChange(event: any): void {
    const index = +event.index;
    const routes = ['', 'tally', 'rack', 'customer'];
    this.router.navigate(['/dashboard/' + routes[index]]);
  }

}
