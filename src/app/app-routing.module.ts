// Updated Angular Import Section
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project Import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

// Client Components (ensure paths are correct)
import { CreateClientComponent } from './pages/client/create-client/create-client.component'; // Adjust path as needed
import { ViewClientComponent } from './pages/client/view-client/view-client.component';       // Adjust path as needed
import { EditClientComponent } from './pages/client/edit-client/edit-client.component';       // Adjust path as needed
import { ListClientComponent } from './pages/client/list-client/list-client.component';       // Adjust path as needed

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
        children: [
          {
            path: '',
            component: ListClientComponent  // List all clients
          },
          {
            path: 'create',
            component: CreateClientComponent // Create new client
          },
          {
            path: ':clientId/view',
            component: ViewClientComponent // View a specific client
          },
          {
            path: ':clientId/edit',
            component: EditClientComponent // Edit a specific client
          }
        ]
      },
      {
        path: '', redirectTo: 'employees', pathMatch: 'full'
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
