import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PipePropertyCategoryComponent } from './pipe-property-category.component';

const routes: Routes = [
  { path: '', component: PipePropertyCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipePropertyCategoryRoutingModule { }
