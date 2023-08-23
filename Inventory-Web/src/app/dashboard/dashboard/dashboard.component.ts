import { Component, OnInit, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { actionGetRacks } from '../../store/rack/rack.actions';
import { AppState } from '../../store/core.state';
import { Rack } from '../../models/rack.model';
import { Observable } from 'rxjs';
import { selectLoadingRacks, selectRacks2 } from '../../store/rack/rack.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // private readonly store: Store = inject(Store);

  private readonly store: Store<AppState> = inject(Store<AppState>);
  
  racks$: Observable<Rack[]> = this.store.select(selectRacks2);
  loadingRacks$: Observable<Boolean> = this.store.pipe(select(selectLoadingRacks));

  ngOnInit(): void {
    console.log('dashboard onInit');
    this.store.dispatch(actionGetRacks());

    
  }

}
