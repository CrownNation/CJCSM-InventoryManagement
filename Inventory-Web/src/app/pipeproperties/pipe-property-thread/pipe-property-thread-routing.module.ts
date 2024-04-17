import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipePropertyThreadComponent } from './pipe-property-thread.component';

const routes: Routes = [
  { path: '', component: PipePropertyThreadComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipePropertyThreadRoutingModule { }
