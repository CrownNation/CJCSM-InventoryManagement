import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipeConfigComponent } from './pipe-config/pipe-config.component';

const routes: Routes = [
  {
    path: 'config',
    component: PipeConfigComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipeRoutingModule { }
