import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchTallyComponent } from './search-tally/search-tally.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { TallyViewComponent } from './tally-view/tally-view.component';
import { ActionsBarComponent } from './actions-bar/actions-bar.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { RackAddComponent } from './rack-add/rack-add.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    DashboardComponent,
    SearchTallyComponent,
    SearchCustomerComponent,
    TallyViewComponent,
    ActionsBarComponent,
    CustomerViewComponent,
    CustomerAddComponent,
    RackAddComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule,
    MatSortModule
  ]
})
export class DashboardModule { }
