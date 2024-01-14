import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RackRoutingModule } from './rack-routing.module';
import { RackListComponent } from './rack-list/rack-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { AddRackComponent } from './add-rack/add-rack.component';
import { ViewRackComponent } from './view-rack/view-rack.component';
import { ViewDetailsRackComponent } from './view-details-rack/view-details-rack.component';
import { TierListComponent } from './tier-list/tier-list.component';
import { AddTierComponent } from './add-tier/add-tier.component';
import { PipeModule } from '../pipe/pipe.module';


@NgModule({
  declarations: [
    RackListComponent,
    AddRackComponent,
    ViewRackComponent,
    ViewDetailsRackComponent,
    TierListComponent,
    AddTierComponent
  ],
  imports: [
    CommonModule,
    RackRoutingModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDialogModule,
    
    PipeModule,
    
  ],
  exports: [
    RackListComponent
  ]
})
export class RackModule { }
