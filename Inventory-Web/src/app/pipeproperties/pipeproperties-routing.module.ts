import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PipepropertiesComponent } from './pipeproperties/pipeproperties.component';

const routes: Routes = [
  {
    path: '',
    component: PipepropertiesComponent,
    children: [
      {
        path: 'category',
        loadChildren: () => import('src/app/pipeproperties/pipe-property-category/pipe-property-category.component').then(m => m.PipePropertyCategoryComponent)
      },
      {
        path: 'coating',
        loadChildren: () => import('src/app/pipeproperties/pipe-property-coating/pipe-property-coating.component').then(m => m.PipePropertyCoatingComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipepropertiesRoutingModule { }
