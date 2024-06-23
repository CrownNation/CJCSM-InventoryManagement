import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchCustomerComponent } from './search-customer/search-customer.component';

const routes: Routes = [
  {
    path: '',
    component: SearchCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchCustomerRoutingModule { }
