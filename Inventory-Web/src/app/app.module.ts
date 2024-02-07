import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';


// import { rackReducers } from './stores/rack';
// import { reducers, metaReducers } from './store';
// import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';

import { environment } from '../environments/environment';
// import { reducers, metaReducers } from './store';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PipepropertiesModule } from './pipeproperties/pipeproperties.module';
// import { provideStore } from '@ngrx/store';
// import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    CoreModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    PipepropertiesModule,

    // StoreModule.forRoot({rack: rackReducers}, {}),

    // StoreModule.forRoot(reducers, { metaReducers }),
      // !environment.production ? StoreDevtoolsModule.instrument() : []

    // StoreModule.forRoot(reducers, { metaReducers }),
    // isDevMode() ? StoreDevtoolsModule.instrument() : [],

    // EffectsModule.forRoot([AppEffects]),


    
  ],
  providers: [
    // provideStore(),
    // provideStoreDevtools(
    //   {
    //   maxAge: 25, // Retains last 25 states
    //   logOnly: !isDevMode(), // Restrict extension to log-only mode
    //   autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    //   trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
    //   traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    // })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
