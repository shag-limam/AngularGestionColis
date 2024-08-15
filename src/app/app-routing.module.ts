// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { ListComponent } from './pages/clients/list/list.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./pages/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./pages/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./pages/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./pages/other/sample-page/sample-page.component')
      },
      {
        path: 'clients',
        loadComponent: () => import('./pages/clients/list/list.component').then(m => m.ListComponent) // Correct path and component
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/authentication/register/register.component')
      }
    ]
  },
  // {
  //   path: '',
  //   component: ListComponent,
  //   children: [
  //     {
  //       path: '/clients',
  //       loadComponent: () => import('./pages/clients/list/list.component')
  //     },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
