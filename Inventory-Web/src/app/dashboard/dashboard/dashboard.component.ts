import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { actionGetRacks, actionGetRacksFullList } from '../../store/rack/rack.actions';
import { AppState } from '../../store/core.state';
import { Rack } from '../../models/rack.model';
import { Observable } from 'rxjs';
import { selectLoadingRacks, selectRacks2 } from '../../store/rack/rack.selectors';
import { actionGetCustomersFullList } from '../../store/customer/customer.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  racks$: Observable<Rack[]> = this.store.select(selectRacks2);
  loadingRacks$: Observable<Boolean> = this.store.pipe(select(selectLoadingRacks));

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.dispatch(actionGetCustomersFullList({ searchParams: null }));
    this.store.dispatch(actionGetRacksFullList({ searchParams: null }));

  }

}
