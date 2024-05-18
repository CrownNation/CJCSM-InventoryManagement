import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchRackComponent } from './search-rack/search-rack.component';
import { SearchTallyComponent } from './search-tally/search-tally.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { TallyViewComponent } from './tally-view/tally-view.component';
import { ActionsBarComponent } from './actions-bar/actions-bar.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { RackViewComponent } from './rack-view/rack-view.component';
import { RackAddComponent } from './rack-add/rack-add.component';
import { PipeDetailViewComponent } from './pipe-detail-view/pipe-detail-view.component';
import { EquipmentDetailViewComponent } from './equipment-detail-view/equipment-detail-view.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    SearchRackComponent,
    SearchTallyComponent,
    SearchCustomerComponent,
    TallyViewComponent,
    ActionsBarComponent,
    CustomerViewComponent,
    CustomerAddComponent,
    RackViewComponent,
    RackAddComponent,
    PipeDetailViewComponent,
    EquipmentDetailViewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class DashboardModule { }
