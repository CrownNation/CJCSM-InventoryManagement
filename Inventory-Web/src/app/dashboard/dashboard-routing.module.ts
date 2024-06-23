import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchPipeComponent } from './search-pipe/search-pipe/search-pipe.component';
import { SearchTallyComponent } from './search-tally/search-tally.component';
import { SearchCustomerComponent } from './search-customer/search-customer/search-customer.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      { path: '', redirectTo: 'pipe', pathMatch: 'full' },
      { path: 'pipe', loadChildren: () => import('./search-pipe/search-pipe.module').then(m => m.SearchPipeModule) },
      { path: 'tally', component: SearchTallyComponent },
      { path: 'rack', loadChildren: () => import('./search-rack/search-rack.module').then(m => m.SearchRackModule) },
      { path: 'customer', loadChildren: () => import('./search-customer/search-customer.module').then(m => m.SearchCustomerModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
