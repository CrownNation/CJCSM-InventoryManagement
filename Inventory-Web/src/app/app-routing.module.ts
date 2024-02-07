import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'tally',
    loadChildren: () =>
      import('./tally/tally.module').then(m => m.TallyModule)
  },
  {
    path: 'rack',
    loadChildren: () =>
      import('./rack/rack.module').then(m => m.RackModule)
  },
  {
    path: 'pipe',
    loadChildren: () =>
      import('./pipe/pipe.module').then(m => m.PipeModule)
  },
  {
    path: 'pipeproperties',
    loadChildren: () => import('./pipeproperties/pipeproperties.module').then(m => m.PipepropertiesModule)
  },
  // {
  //   path: 'admin',
  //   loadChildren: () =>
  //     import('./admin/admin.module').then(m => m.AdminModule)
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
