import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

// Todo: Move these to a shared module
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { rackReducers } from './stores/rack';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    CoreModule,
    AuthModule,

    MatToolbarModule,
    MatIconModule,
    StoreModule.forRoot({rack: rackReducers}, {})    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
