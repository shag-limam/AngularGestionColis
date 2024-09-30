import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Importer RouterModule pour routerLink
import { ClientService } from '../Client.Service';  // Import ClientService
import { Client } from '../../Model/client';  // Import Client model
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';  // Import Dialog Component
import { MatDialog, MatDialogModule } from '@angular/material/dialog';  // Import MatDialog and MatDialogModule
import { MatButtonModule } from '@angular/material/button';  // Import MatButtonModule for buttons


@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent {

  clients: Client[] = [];

  constructor(public clientService: ClientService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getAllClients().subscribe(
      (data: Client[]) => {
        this.clients = data;
        console.log('Clients fetched:', this.clients);
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  confirmDelete(clientId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      position: { top: '10%' },
      panelClass: 'custom-dialog-container'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteClient(clientId);
      }
    });
  }

  deleteClient(id: number): void {
    this.clientService.deleteClient(id).subscribe(
      () => {
        console.log('Client deleted successfully!');
        this.getClients();
      },
      (error) => {
        console.error('Error deleting client:', error);
      }
    );
  }

  // Nouvelle méthode pour basculer le statut du client
  toggleClientStatus(client: Client): void {
    client.active = !client.active; // Inverser le statut actuel
    this.clientService.updateClientStatus(client.id, client.active).subscribe(
      () => {
        console.log(`Client ${client.id} status updated to ${client.active ? 'active' : 'inactive'}`);
      },
      (error) => {
        console.error('Error updating client status:', error);
      }
    );
  }
}
