import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipePropertyGradeComponent } from './pipe-property-grade.component';

const routes: Routes = [
  { path: '', component: PipePropertyGradeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipePropertyGradeRoutingModule { }
