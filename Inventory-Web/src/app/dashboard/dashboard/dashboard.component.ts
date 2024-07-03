import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { Observable, Subscription, of } from 'rxjs';
import { actionGetCustomersFullList } from '../../store/customer/customer.actions';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AppNotification } from 'src/app/models/app-notification.model';
import { selectNotifications } from 'src/app/store/notification-hub/notification-hub.selectors';
import { filter, map, tap } from 'rxjs/operators';
import { actionGetAllPipeProperties } from 'src/app/store/pipe-properties/pipe-properties/pipe-properties.actions';
import { PipeProperties } from 'src/app/models/pipe.model';
import { selectAllPipeProperties } from 'src/app/store/pipe-properties/pipe-properties/pipe-properties.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  selectedTabIndex: number = 0;  // Default to the first tab

  notifications$: Observable<AppNotification[]> = of([]);
  pipeProperties$!: Observable<PipeProperties | null>;
  pipePropertiesSubscription!: Subscription;

  constructor(private store: Store<AppState>, private router: Router, private activatedRoute: ActivatedRoute) {
    this.notifications$ = this.store.select(selectNotifications);

    // Handle route changes and update the selected tab index accordingly
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateSelectedTabIndex();
    });


  }

  ngOnInit(): void {
    this.store.dispatch(actionGetCustomersFullList({ searchParams: null }));
    this.store.dispatch(actionGetAllPipeProperties());

    this.pipePropertiesSubscription = this.store.select(selectAllPipeProperties)
      .subscribe(pipeProperties => {
        console.log('Pipe properties loaded:', pipeProperties ? pipeProperties.categories : 'No categories found');
      });

  }


  /**
   * Updates the selected tab index based on the deepest active child route in the Angular Router's state tree.
   * This function navigates through the route hierarchy starting from the root activated route and moving to the
   * deepest child that has a non-empty path. It's used to synchronize the tab selection with the current route,
   * ensuring that the correct tab is highlighted based on the URL.
   */
  private updateSelectedTabIndex(): void {
    let route = this.activatedRoute;  // Start with the root of the route hierarchy.
    let lastPath = '';  // This will hold the path of the deepest non-empty route.

    // Traverse through the child routes to find the deepest non-empty route segment.
    while (route.firstChild) {
      route = route.firstChild;  // Move to the next child.
      const currentPath = route.snapshot.url.map(segment => segment.path).join('/');
      if (currentPath) lastPath = currentPath; // Only update lastPath if it's not empty, avoiding overriding with an empty path.
    }

    // Convert the final route segment into a tab index using a helper function.
    this.selectedTabIndex = this.getPathIndex(lastPath);
    console.log('Final route segment:', lastPath);  // Output the deepest path segment for debugging.
    console.log('Updated tab index to:', this.selectedTabIndex);  // Output the newly set tab index for debugging.
  }

  getPathIndex(path: string): number {
    switch (path) {
      case 'tally': return 0;
      case 'pipe': return 1;
      case 'rack': return 2;
      case 'customer': return 3;
      default: return 0; // Default tab index if no match
    }
  }

  onTabChange(event: any): void {
    const index = +event.index;
    const routes = ['tally', 'pipe', 'rack', 'customer'];
    this.router.navigate(['/dashboard/' + routes[index]]);
  }

}
