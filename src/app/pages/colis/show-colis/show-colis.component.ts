import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColisService } from '../colis.service';
import { ClientService } from '../../client/Client.Service';
import { Colis } from '../../Model/colis';
import { Client } from '../../Model/client';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-colis',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show-colis.component.html',
  styleUrls: ['./show-colis.component.css']
})
export class ShowColisComponent implements OnInit {
  colisId!: number;
  colis!: Colis;
  client!: Client; // Pour stocker les informations du client
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private colisService: ColisService,
    private clientService: ClientService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('colisId');
    if (id) {
      this.colisId = +id;
      this.getColisDetails();
    } else {
      console.error('Erreur : Impossible de récupérer l\'ID du colis depuis l\'URL.');
      this.isLoading = false;
    }
  }

  getColisDetails(): void {
    this.colisService.getColisById(this.colisId).subscribe(
      (data: Colis) => {
        this.colis = data;
        this.getClientDetails(this.colis.clientId); // Récupérer les détails du client avec `clientId`
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du colis :', error);
        this.isLoading = false;
      }
    );
  }

  getClientDetails(clientId: number): void {
    this.clientService.getClientById(clientId).subscribe(
      (data: Client) => {
        this.client = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du client :', error);
      }
    );
  }

  // Méthode pour retourner à la page précédente
  goBack(): void {
    this.location.back();
  }

  // Méthode pour aller à la liste des colis
  goToList(): void {
    this.router.navigate(['/colis']);
  }
}
