import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  // {
  //   path: ':customerId',
  //   component: DashboardComponent,
  //   data: { title: 'Dashboard' }
  // },
  // {
  //   path: ':customerId/:id',
  //   component: ReportComponent,
  // },
  // {
  //   path: ':id',
  //   component: ReportComponent,
  //   // canActivate: [AuthGuardService],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
