import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RackModule } from '../rack/rack.module';
import { PipeModule } from '../pipe/pipe.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RackModule,
    PipeModule,
  ]
})
export class DashboardModule { }
