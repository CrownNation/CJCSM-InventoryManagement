import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      { path: '', redirectTo: 'tally', pathMatch: 'full' },
      { path: 'tally', loadChildren: () => import('./search-tally/search-tally.module').then(m => m.SearchTallyModule) },
      { path: 'pipe', loadChildren: () => import('./search-pipe/search-pipe.module').then(m => m.SearchPipeModule) },
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
