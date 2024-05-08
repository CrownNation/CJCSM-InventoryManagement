import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipePropertyRangeComponent } from './pipe-property-range.component';

const routes: Routes = [
  { path: '', component: PipePropertyRangeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipePropertyRangeRoutingModule { }
