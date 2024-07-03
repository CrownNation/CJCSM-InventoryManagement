import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActionsBarComponent } from './actions-bar/actions-bar.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { RackAddComponent } from './rack-add/rack-add.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { SearchCustomerModule } from './search-customer/search-customer.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ActionsBarComponent,
    CustomerAddComponent,
    RackAddComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule,
    MatSortModule,
    SearchCustomerModule
  ]
})
export class DashboardModule { }
