import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipePropertyWeightComponent } from './pipe-property-weight.component';

const routes: Routes = [
  { path: '', component: PipePropertyWeightComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipePropertyWeightRoutingModule { }
