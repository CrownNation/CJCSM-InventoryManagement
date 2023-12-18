import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRackComponent } from './add-rack/add-rack.component';
import { ViewRackComponent } from './view-rack/view-rack.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddRackComponent 
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
