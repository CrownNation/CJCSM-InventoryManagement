import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RackModule } from '../rack/rack.module';
import { PipeModule } from '../pipe/pipe.module';
import { SearchRackComponent } from './search-rack/search-rack.component';
import { SearchTallyComponent } from './search-tally/search-tally.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { TallyViewComponent } from './tally-view/tally-view.component';
import { ActionsBarComponent } from './actions-bar/actions-bar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SearchRackComponent,
    SearchTallyComponent,
    SearchCustomerComponent,
    TallyViewComponent,
    ActionsBarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RackModule,
    PipeModule,

    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ]
})
export class DashboardModule { }
