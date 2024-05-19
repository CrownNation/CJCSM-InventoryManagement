import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchPipeComponent } from '../shared/search-pipe/search-pipe.component';
import { SearchTallyComponent } from './search-tally/search-tally.component';
import { SearchCustomerComponent } from './search-customer/search-customer.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      { path: '', redirectTo: 'pipe', pathMatch: 'full' },
      { path: 'pipe', component: SearchPipeComponent },
      { path: 'tally', component: SearchTallyComponent },
      { path: 'rack', loadChildren: () => import('./search-rack/search-rack.module').then(m => m.SearchRackModule) },
      { path: 'customer', component: SearchCustomerComponent }    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
