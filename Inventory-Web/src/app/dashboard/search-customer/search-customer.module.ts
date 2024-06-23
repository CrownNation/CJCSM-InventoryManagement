import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { SearchCustomerRoutingModule } from './search-customer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerViewComponent } from './customer-view/customer-view.component';

@NgModule({
  declarations: [
    SearchCustomerComponent,
    CustomerViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SearchCustomerRoutingModule,
    SharedModule,
  ],
  exports: [
    SearchCustomerComponent
  ]
})
export class SearchCustomerModule {
  

 }
