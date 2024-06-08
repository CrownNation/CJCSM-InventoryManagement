import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { Observable, of } from 'rxjs';
import { actionGetCustomersFullList } from '../../store/customer/customer.actions';
import { actionGetPipeDefinitionsList } from '../../store/pipe/pipe.actions';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AppNotification } from 'src/app/models/app-notification.model';
import { selectNotifications } from 'src/app/store/notification-hub/notification-hub.selectors';
import { actionGetTallies } from 'src/app/store/tally/tally.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  selectedTabIndex: number = 0;  // Default to the first tab

  notifications$: Observable<AppNotification[]> = of([]);
   
  constructor(private store: Store<AppState>, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.notifications$ = this.store.select(selectNotifications);

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event);
      }
    });
    
  }

  ngOnInit(): void {
    this.store.dispatch(actionGetCustomersFullList({ searchParams: null }));
    this.store.dispatch(actionGetPipeDefinitionsList({ searchParams: null }));
    this.store.dispatch(actionGetTallies({searchParams: null}));

    this.activatedRoute.firstChild?.url.pipe(
      map(segments => segments.length > 0 ? segments[0].path : '')
    ).subscribe(path => {
      this.selectedTabIndex = this.getPathIndex(path);
    });
  }

  getPathIndex(path: string): number {
    switch (path) {
      case 'pipe': return 0;
      case 'tally': return 1;
      case 'rack': return 2;
      case 'customer': return 3;
      default: return 0; // Default tab index if no match
    }
  }

  onTabChange(event: any): void {
    const index = +event.index;
    const routes = ['pipe', 'tally', 'rack', 'customer'];
    this.router.navigate(['/dashboard/' + routes[index]]);
  }

}
