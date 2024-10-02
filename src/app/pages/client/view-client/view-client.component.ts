// src/app/components/view-client/view-client.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../Client.Service';  // Import du service pour les clients
import { Client } from '../../Model/client';  // Import du modèle Client
import { CommonModule } from '@angular/common';  // Pour *ngIf, *ngFor
import { RouterModule } from '@angular/router';  // Pour routerLink

@Component({
  selector: 'app-view-client',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {

  clientId!: number;
  client!: Client;
  isLoading = true;  // Pour afficher un indicateur de chargement

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    // Récupère l'ID du client depuis les paramètres de route
    this.clientId = +this.route.snapshot.paramMap.get('clientId')!;
    
    // Récupère les données du client depuis le service
    this.clientService.getClientById(this.clientId).subscribe(
      (client: Client) => {
        this.client = client;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données du client:', error);
        this.isLoading = false;
      }
    );
  }
}
