import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipepropertiesComponent } from './pipeproperties/pipeproperties.component';

const routes: Routes = [
  { path: '', component: PipepropertiesComponent }
  // You might add more routes related to pipeproperties here
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipepropertiesRoutingModule { }
