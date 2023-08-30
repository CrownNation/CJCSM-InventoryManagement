import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { actionGetRacks } from '../../store/rack/rack.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private readonly store: Store = inject(Store);

  ngOnInit(): void {
    console.log('dashboard onInit');
    this.store.dispatch(actionGetRacks());
  }

}
