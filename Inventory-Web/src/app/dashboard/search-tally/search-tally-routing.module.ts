import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchTallyComponent } from './search-tally/search-tally.component';

const routes: Routes = [
  {
    path: '',
    component: SearchTallyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchTallyRoutingModule { }
