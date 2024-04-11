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
        loadChildren: () => import('./pipe-property-category/pipe-property-category.module').then(m => m.PipePropertyCategoryModule)      },
      {
        path: 'coating',
        loadChildren: () => import('./pipe-property-coating/pipe-property-coating.module').then(m => m.PipePropertyCoatingModule)
      }
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
