import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addRack } from './rack.actions';
import { selectRacks } from './rack.selectors';
import { Observable } from 'rxjs';
import { Rack } from '../../models/rack.model';

@Injectable({ providedIn: 'root' })
export class RackFacade {
  private readonly store: Store = inject(Store);

  readonly racks$: Observable<Rack[]> = this.store.select(selectRacks);

  addRack(rack: Rack): void {
    this.store.dispatch(addRack({ rack }));
  }


  
}