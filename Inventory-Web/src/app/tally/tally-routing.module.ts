import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TallyDashboardComponent } from './tally-dashboard/tally-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: TallyDashboardComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TallyRoutingModule { }
