import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RackRoutingModule } from './rack-routing.module';
import { RackListComponent } from './rack-list/rack-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    RackListComponent
  ],
  imports: [
    CommonModule,
    RackRoutingModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule
  ],
  exports: [
    RackListComponent
  ]
})
export class RackModule { }
