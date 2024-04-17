import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipePropertyWallComponent } from './pipe-property-wall.component';

const routes: Routes = [
  { path: '', component: PipePropertyWallComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipePropertyWallRoutingModule { }
