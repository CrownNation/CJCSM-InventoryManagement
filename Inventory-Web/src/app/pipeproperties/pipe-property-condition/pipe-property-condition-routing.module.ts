import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipePropertyConditionComponent } from './pipe-property-condition.component';

const routes: Routes = [
  { path: '', component: PipePropertyConditionComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipePropertyConditionRoutingModule { }
