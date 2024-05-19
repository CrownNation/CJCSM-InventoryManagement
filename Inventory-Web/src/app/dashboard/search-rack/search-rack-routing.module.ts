import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchRackComponent } from './search-rack/search-rack.component';

const routes: Routes = [
  {
    path: '',
    component: SearchRackComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRackRoutingModule { }
