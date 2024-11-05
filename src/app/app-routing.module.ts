// // Updated Angular Import Section
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// // Project Import
// import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
// import { GuestComponent } from './theme/layouts/guest/guest.component';

// // Client Components (ensure paths are correct)
// import { CreateClientComponent } from './pages/client/create-client/create-client.component'; // Adjust path as needed
// import { ViewClientComponent } from './pages/client/view-client/view-client.component';       // Adjust path as needed
// import { EditClientComponent } from './pages/client/edit-client/edit-client.component';       // Adjust path as needed
// import { ListClientComponent } from './pages/client/list-client/list-client.component';       // Adjust path as needed


// // Livreur Components (ensure paths are correct)
// import { ListLivreurComponent } from './pages/livreur/list-livreur/list-livreur.component';      // Liste des livreurs
// import { ShowLivreurComponent } from './pages/livreur/show-livreur/show-livreur.component';      // Affichage d'un livreur
// import { LivreurFormDialogComponent } from './pages/livreur/livreur-form-dialog/livreur-form-dialog.component'; // Formulaire de livreur


// const routes: Routes = [
//   {
//     path: '',
//     component: AdminComponent,
//     children: [
//       {
//         path: '',
//         redirectTo: '/login',
//         pathMatch: 'full'
//       },
//       {
//         path: 'dashboard/default',
//         loadComponent: () => import('./pages/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
//       },
//       {
//         path: 'typography',
//         loadComponent: () => import('./pages/ui-component/typography/typography.component')
//       },
//       {
//         path: 'color',
//         loadComponent: () => import('./pages/ui-component/ui-color/ui-color.component')
//       },
//       {
//         path: 'sample-page',
//         loadComponent: () => import('./pages/other/sample-page/sample-page.component')
//       },
//       {
//         path: 'clients',
//         children: [
//           {
//             path: '',
//             component: ListClientComponent  // List all clients
//           },
//           {
//             path: 'create',
//             component: CreateClientComponent // Create new client
//           },
//           {
//             path: ':clientId/view',
//             component: ViewClientComponent // View a specific client
//           },
//           {
//             path: ':clientId/edit',
//             component: EditClientComponent // Edit a specific client
//           }
//         ]
//       },
//       {
//         path: 'livreurs',
//         children: [
//           {
//             path: '',
//             component: ListLivreurComponent  // Liste tous les livreurs
//           },
//           {
//             path: 'create',
//             component: LivreurFormDialogComponent // Crée un nouveau livreur
//           },
//           {
//             path: ':livreurId/view',
//             component: ShowLivreurComponent // Affiche un livreur spécifique
//           },
//           {
//             path: ':livreurId/edit',
//             component: LivreurFormDialogComponent // Met à jour un livreur spécifique
//           }
//         ]
//       },
//       {
//         path: '', redirectTo: 'employees', pathMatch: 'full'
//       }
//     ]
//   },
//   {
//     path: '',
//     component: GuestComponent,
//     children: [
//       {
//         path: 'login',
//         loadComponent: () => import('./pages/authentication/login/login.component')
//       },
//       {
//         path: 'register',
//         loadComponent: () => import('./pages/authentication/register/register.component')
//       }
//     ]
//   }
// ];


// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}


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

// Livreur Components (ensure paths are correct)
import { ListLivreurComponent } from './pages/livreur/list-livreur/list-livreur.component';      // Liste des livreurs
import { ShowLivreurComponent } from './pages/livreur/show-livreur/show-livreur.component';      // Affichage d'un livreur
import { LivreurFormDialogComponent } from './pages/livreur/livreur-form-dialog/livreur-form-dialog.component'; // Formulaire de livreur

// Colis Components (ensure paths are correct)
import { ListColisComponent } from './pages/colis/list-colis/list-colis.component';         // Liste des colis
import { ShowColisComponent } from './pages/colis/show-colis/show-colis.component';         // Affichage d'un colis
import { ColisFormDialogComponent } from './pages/colis/colis-form-dialog/colis-form-dialog.component'; // Formulaire de colis

// Livraison Components (ensure paths are correct)
import { ListLivraisonComponent } from './pages/livraison/list-livraison/list-livraison.component';   // Liste des livraisons
import { ShowLivraisonComponent } from './pages/livraison/show-livraison/show-livraison.component';   // Affichage d'une livraison
import { LivraisonFormDialogComponent } from './pages/livraison/livraison-form-dialog/livraison-form-dialog.component'; // Formulaire de livraison

import { ListVehiculesComponent } from './pages/vehicules/list-vehicules/list-vehicules.component';  // Liste des véhicules

import { NotificationsComponent } from './pages/notifications/notifications/notifications.component';  // Liste des véhicules


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
            component: ListClientComponent  // Liste tous les clients
          },
          {
            path: 'create',
            component: CreateClientComponent // Crée un nouveau client
          },
          {
            path: ':clientId/view',
            component: ViewClientComponent // Affiche un client spécifique
          },
          {
            path: ':clientId/edit',
            component: EditClientComponent // Met à jour un client spécifique
          }
        ]
      },
      {
        path: 'livreurs',
        children: [
          {
            path: '',
            component: ListLivreurComponent  // Liste tous les livreurs
          },
          {
            path: 'create',
            component: LivreurFormDialogComponent // Crée un nouveau livreur
          },
          {
            path: ':livreurId/view',
            component: ShowLivreurComponent // Affiche un livreur spécifique
          },
          {
            path: ':livreurId/edit',
            component: LivreurFormDialogComponent // Met à jour un livreur spécifique
          }
        ]
      },
      {
        path: 'colis',
        children: [
          {
            path: '',
            component: ListColisComponent  // Liste tous les colis
          },
          {
            path: 'create',
            component: ColisFormDialogComponent // Crée un nouveau colis
          },
          {
            path: ':colisId/view',
            component: ShowColisComponent // Affiche un colis spécifique
          },
          {
            path: ':colisId/edit',
            component: ColisFormDialogComponent // Met à jour un colis spécifique
          }
        ]
      },
      {
        path: 'livraisons',
        children: [
          {
            path: '',
            component: ListLivraisonComponent  // Liste toutes les livraisons
          },
          {
            path: 'create',
            component: LivraisonFormDialogComponent // Crée une nouvelle livraison
          },
          {
            path: ':livraisonId/view',
            component: ShowLivraisonComponent // Affiche une livraison spécifique
          },
          {
            path: ':livraisonId/edit',
            component: LivraisonFormDialogComponent // Met à jour une livraison spécifique
          }
        ]
      },
      {
        path: 'vehicules',
        children: [
          {
            path: '',
            component: ListVehiculesComponent  // Liste tous les véhicules
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            component: NotificationsComponent  // Liste tous les véhicules
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



// // Updated Angular Import Section
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// // Project Import
// import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
// import { GuestComponent } from './theme/layouts/guest/guest.component';

// // Client Components (ensure paths are correct)
// import { CreateClientComponent } from './pages/client/create-client/create-client.component'; // Adjust path as needed
// import { ViewClientComponent } from './pages/client/view-client/view-client.component';       // Adjust path as needed
// import { EditClientComponent } from './pages/client/edit-client/edit-client.component';       // Adjust path as needed
// import { ListClientComponent } from './pages/client/list-client/list-client.component';       // Adjust path as needed

// // Livreur Components (ensure paths are correct)
// import { ListLivreurComponent } from './pages/livreur/list-livreur/list-livreur.component';      // Liste des livreurs
// import { ShowLivreurComponent } from './pages/livreur/show-livreur/show-livreur.component';      // Affichage d'un livreur
// import { LivreurFormDialogComponent } from './pages/livreur/livreur-form-dialog/livreur-form-dialog.component'; // Formulaire de livreur

// // Colis Components (ensure paths are correct)
// import { ListColisComponent } from './pages/colis/list-colis/list-colis.component';         // Liste des colis
// import { ShowColisComponent } from './pages/colis/show-colis/show-colis.component';         // Affichage d'un colis
// import { ColisFormDialogComponent } from './pages/colis/colis-form-dialog/colis-form-dialog.component'; // Formulaire de colis

// const routes: Routes = [
//   {
//     path: '',
//     component: AdminComponent,
//     children: [
//       {
//         path: '',
//         redirectTo: '/login',
//         pathMatch: 'full'
//       },
//       {
//         path: 'dashboard/default',
//         loadComponent: () => import('./pages/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
//       },
//       {
//         path: 'typography',
//         loadComponent: () => import('./pages/ui-component/typography/typography.component')
//       },
//       {
//         path: 'color',
//         loadComponent: () => import('./pages/ui-component/ui-color/ui-color.component')
//       },
//       {
//         path: 'sample-page',
//         loadComponent: () => import('./pages/other/sample-page/sample-page.component')
//       },
//       {
//         path: 'clients',
//         children: [
//           {
//             path: '',
//             component: ListClientComponent  // List all clients
//           },
//           {
//             path: 'create',
//             component: CreateClientComponent // Create new client
//           },
//           {
//             path: ':clientId/view',
//             component: ViewClientComponent // View a specific client
//           },
//           {
//             path: ':clientId/edit',
//             component: EditClientComponent // Edit a specific client
//           }
//         ]
//       },
//       {
//         path: 'livreurs',
//         children: [
//           {
//             path: '',
//             component: ListLivreurComponent  // Liste tous les livreurs
//           },
//           {
//             path: 'create',
//             component: LivreurFormDialogComponent // Crée un nouveau livreur
//           },
//           {
//             path: ':livreurId/view',
//             component: ShowLivreurComponent // Affiche un livreur spécifique
//           },
//           {
//             path: ':livreurId/edit',
//             component: LivreurFormDialogComponent // Met à jour un livreur spécifique
//           }
//         ]
//       },
//       {
//         path: 'colis',
//         children: [
//           {
//             path: '',
//             component: ListColisComponent  // Liste tous les colis
//           },
//           {
//             path: 'create',
//             component: ColisFormDialogComponent // Crée un nouveau colis
//           },
//           {
//             path: ':colisId/view',
//             component: ShowColisComponent // Affiche un colis spécifique
//           },
//           {
//             path: ':colisId/edit',
//             component: ColisFormDialogComponent // Met à jour un colis spécifique
//           }
//         ]
//       },
//       {
//         path: '', redirectTo: 'employees', pathMatch: 'full'
//       }
//     ]
//   },
//   {
//     path: '',
//     component: GuestComponent,
//     children: [
//       {
//         path: 'login',
//         loadComponent: () => import('./pages/authentication/login/login.component')
//       },
//       {
//         path: 'register',
//         loadComponent: () => import('./pages/authentication/register/register.component')
//       }
//     ]
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
