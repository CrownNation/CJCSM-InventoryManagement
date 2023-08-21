import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RackRoutingModule } from './rack-routing.module';
import { RackListComponent } from './rack-list/rack-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    RackListComponent
  ],
  imports: [
    CommonModule,
    RackRoutingModule,
    MatProgressSpinnerModule
  ],
  exports: [
    RackListComponent
  ]
})
export class RackModule { }
