import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPipeComponent } from './search-pipe/search-pipe.component';

const routes: Routes = [
  {
    path: '',
    component: SearchPipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchPipeRoutingModule { }
