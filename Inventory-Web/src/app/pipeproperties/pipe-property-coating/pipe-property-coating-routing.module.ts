import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipePropertyCoatingComponent } from './pipe-property-coating.component';

const routes: Routes = [
  { path: '', component: PipePropertyCoatingComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipePropertyCoatingRoutingModule { }
