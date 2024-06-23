import { NgModule } from '@angular/core';
import { NavigationStart, Router, RouterModule, Routes } from '@angular/router';
import { PipepropertiesComponent } from './pipeproperties/pipeproperties.component';

const routes: Routes = [
  {
    path: '',
    component: PipepropertiesComponent,
    children: [
      {
        path: '', // Empty path redirects to category
        pathMatch: 'full',
        redirectTo: 'category'
      },
      {
        path: 'category',
        loadChildren: () => import('./pipe-property-category/pipe-property-category.module').then(m => m.PipePropertyCategoryModule)      
      },
      {
        path: 'coating',
        loadChildren: () => import('./pipe-property-coating/pipe-property-coating.module').then(m => m.PipePropertyCoatingModule)
      },
      {
        path: 'condition',
        loadChildren: () => import('./pipe-property-condition/pipe-property-condition.module').then(m => m.PipePropertyConditionModule)
      },
      {
        path: 'grade',
        loadChildren: () => import('./pipe-property-grade/pipe-property-grade.module').then(m => m.PipePropertyGradeModule)
      },
      {
        path: 'range',
        loadChildren: () => import('./pipe-property-range/pipe-property-range.module').then(m => m.PipePropertyRangeModule)
      },
      {
        path: 'size',
        loadChildren: () => import('./pipe-property-size/pipe-property-size.module').then(m => m.PipePropertySizeModule)
      },
      {
        path: 'thread',
        loadChildren: () => import('./pipe-property-thread/pipe-property-thread.module').then(m => m.PipePropertyThreadModule)
      },
      {
        path: 'wall',
        loadChildren: () => import('./pipe-property-wall/pipe-property-wall.module').then(m => m.PipePropertyWallModule)
      },
      {
        path: 'weight',
        loadChildren: () => import('./pipe-property-weight/pipe-property-weight.module').then(m => m.PipePropertyWeightModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PipepropertiesRoutingModule { 
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('Navigation started:', event.url);
        // You can add more logic here to filter specific routes if needed
      }
    });
  }
}
