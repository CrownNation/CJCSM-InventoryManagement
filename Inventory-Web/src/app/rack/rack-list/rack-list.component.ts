import { Component, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Rack } from '../../models/rack.model';
import { selectAllRackEntities, selectErrorLoadingRacks, selectLoadingRacks, selectRacks } from '../../store/rack/rack.selectors';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from '../../store/core.state';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'app-rack-list',
  templateUrl: './rack-list.component.html',
  styleUrls: ['./rack-list.component.scss']
})

export class RackListComponent {

  private readonly store: Store<AppState> = inject(Store<AppState>);

  racks$: Observable<Dictionary<any>> = this.store.pipe(select(selectRacks));
  loadingRack$: Observable<Boolean> = this.store.pipe(select(selectLoadingRacks));
  errorRacks$: Observable<HttpErrorResponse | null> = this.store.pipe(select(selectErrorLoadingRacks));

}
