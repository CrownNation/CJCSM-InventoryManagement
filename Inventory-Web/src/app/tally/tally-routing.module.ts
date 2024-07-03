import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TallyAddComponent } from './tally-add/tally-add.component';
import { SearchTallyComponent } from '../dashboard/search-tally/search-tally/search-tally.component';

const routes: Routes = [
  {
    path: '',
    component: SearchTallyComponent
  },
  {
    path: 'add',
    component: TallyAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TallyRoutingModule { }
