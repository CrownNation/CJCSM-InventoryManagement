import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TallyDashboardComponent } from './tally-dashboard/tally-dashboard.component';
import { TallyAddComponent } from './tally-add/tally-add.component';

const routes: Routes = [
  {
    path: '',
    component: TallyAddComponent
  },
  {
    path: 'add',
    component: TallyAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TallyRoutingModule { }
