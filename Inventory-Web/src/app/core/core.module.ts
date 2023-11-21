import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RackService } from './services/rack.service';

import { environment } from '../../environments/environment';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from '../app.effects';
import { AuthModule } from '../auth/auth.module';
import { metaReducers, reducers } from '../store/core.state';
import { LoginComponent } from '../auth/login/login.component';
import { RackEffects } from '../store/rack/rack.effects';
import { TallyEffects } from '../store/tally/tally.effects';
import { CustomerEffects } from '../store/customer/customer.effects';
import { HttpClientModule } from '@angular/common/http';
import { TallyService } from './services/tally.service';
import { CustomerService } from './services/customer.service';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthModule,
    
    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([RackEffects, TallyEffects, CustomerEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument({
      name: 'CJCSM Inventory'
    }),
  ],
  providers:[ RackService, TallyService, CustomerService ],
  exports: [
    HttpClientModule,
    LoginComponent
  ]
})

export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
 }
