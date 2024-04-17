import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipePropertySizeComponent } from './pipe-property-size.component';

const routes: Routes = [
  { path: '', component: PipePropertySizeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipePropertySizeRoutingModule { }
