// import { Component, OnInit } from '@angular/core';
// import { UserService } from 'src/app/services/user.service'; // Make sure the path is correct

// import { HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { Client } from 'src/app/models/client/model';


// @Component({
//   selector: 'app-list',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule], // Import the necessary modules here
//   templateUrl: './list.component.html',
//   styleUrls: ['./list.component.scss']
// })
// export class ListComponent implements OnInit {
//   clients: any[] = [];
//   isLoading: boolean = true;
//   error: string | null = null;

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     this.loadClients();
//   }

//   loadClients(): void {
//     this.userService.getClients().subscribe({
//       next: (data: any) => {
//         this.clients = data; // Ensure that data is an array
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching clients', err);
//         this.error = 'Failed to load clients.';
//         this.isLoading = false;
//       }
//     });
//   }

//   updateClient(client: Client): void {
//     this.userService.updateClient(client.id, client).subscribe({
//       next: (updatedClient: Client) => {
//         this.clients = this.clients.map(c =>
//           c.id === updatedClient.id ? updatedClient : c
//         );
//       },
//       error: (err) => {
//         console.error('Error updating client', err);
//         this.error = 'Failed to update client.';
//       }
//     });
//   }
  

//   deleteClient(clientId: number): void {
//     this.userService.deleteClient(clientId).subscribe({
//       next: () => {
//         this.clients = this.clients.filter(client => client.id !== clientId);
//       },
//       error: (err) => {
//         console.error('Error deleting client', err);
//         this.error = 'Failed to delete client.';
//       }
//     });
//   }

//   signupClient(clientData: any): void {
//     this.userService.signupClient(clientData).subscribe({
//       next: (newClient) => {
//         this.clients.push(newClient);
//       },
//       error: (err) => {
//         console.error('Error signing up client', err);
//         this.error = 'Failed to sign up client.';
//       }
//     });
//   }
// }

// src/app/pages/clients/list/list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service'; // Assurez-vous que le chemin est correct
import { Client } from 'src/app/models/client/model'; // Importez l'interface Client
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Importez les modules nécessaires ici
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  clients: Client[] = []; // Typage des clients avec l'interface Client
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.userService.getClients().subscribe({
      next: (data: Client[]) => { // Typage de la réponse
        this.clients = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching clients', err);
        this.error = 'Failed to load clients.';
        this.isLoading = false;
      }
    });
  }

  updateClient(client: Client): void {
    this.userService.updateClient(client.id, client).subscribe({
      next: (updatedClient: Client) => {
        this.clients = this.clients.map(c =>
          c.id === updatedClient.id ? updatedClient : c
        );
      },
      error: (err) => {
        console.error('Error updating client', err);
        this.error = 'Failed to update client.';
      }
    });
  }

  deleteClient(clientId: number): void {
    this.userService.deleteClient(clientId).subscribe({
      next: () => {
        this.clients = this.clients.filter(client => client.id !== clientId);
      },
      error: (err) => {
        console.error('Error deleting client', err);
        this.error = 'Failed to delete client.';
      }
    });
  }

  signupClient(clientData: Client): void { // Typage de la donnée de l'inscription
    this.userService.signupClient(clientData).subscribe({
      next: (newClient: Client) => {
        this.clients.push(newClient);
      },
      error: (err) => {
        console.error('Error signing up client', err);
        this.error = 'Failed to sign up client.';
      }
    });
  }
}
