import { Component, OnInit, inject } from '@angular/core';
// import { RackFacade, getRacks } from '../../stores/rack';
import { Store } from '@ngrx/store';
import { actionGetRacks } from '../../store/rack/rack.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  // private readonly rackFacade: RackFacade = inject(RackFacade);
  private readonly store: Store = inject(Store);


  ngOnInit(): void {
    console.log('login init');
    // this.rackFacade.getRacks();

    // this.store.dispatch(actionGetRacks());

  }

  // StoreModule.forRoot(reducers, { metaReducers }),
  // isDevMode() ? StoreDevtoolsModule.instrument() : [],
  // EffectsModule.forRoot([AppEffects])

}
