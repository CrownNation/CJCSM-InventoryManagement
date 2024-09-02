import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewRackComponent } from './view-rack/view-rack.component';
import { RackAddComponent } from '../dashboard/rack-add/rack-add.component';

const routes: Routes = [
  {
    path: 'add',
    component: RackAddComponent 
  },
  {
    path: ':id',
    component: ViewRackComponent 
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RackRoutingModule { }
