import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculeService } from '../vehicule.service';
import { Vehicule } from '../../Model/vehicule';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-vehicules',
  templateUrl: './list-vehicules.component.html',
  styleUrls: ['./list-vehicules.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ListVehiculesComponent implements OnInit {

  vehicules: Vehicule[] = [];

  constructor(private vehiculeService: VehiculeService, private router: Router) { }

  ngOnInit(): void {
    this.getAllVehicules();
  }

  // Récupérer la liste des véhicules
  getAllVehicules(): void {
    this.vehiculeService.getAllVehicules().subscribe(
      (data: Vehicule[]) => {
        this.vehicules = data;
      },
      error => {
        console.error('Erreur lors de la récupération des véhicules :', error);
      }
    );
  }

  // Afficher les détails du véhicule dans une page indépendante
  showVehiculeDetails(vehicule: Vehicule): void {
    this.router.navigate([`/vehicules/${vehicule.id}/view`]);
  }

  // Accepter un véhicule
  approveVehicule(vehiculeId: number): void {
    this.vehiculeService.approveVehicule(vehiculeId).subscribe(
      () => this.getAllVehicules(),
      error => console.error('Erreur lors de l\'approbation du véhicule :', error)
    );
  }

  // Rejeter un véhicule avec un motif
  rejectVehicule(vehiculeId: number): void {
    Swal.fire({
      title: 'Rejeter le véhicule',
      input: 'text',
      inputLabel: 'Entrez un motif de rejet',
      showCancelButton: true,
      confirmButtonText: 'Rejeter',
      cancelButtonText: 'Annuler',
      customClass: { popup: 'sweetheart-theme' }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.vehiculeService.rejectVehicule(vehiculeId, result.value).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Rejeté',
              text: 'Le véhicule a été rejeté avec succès.',
              customClass: { popup: 'sweetheart-theme' }
            });
            this.getAllVehicules();
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Erreur lors du rejet du véhicule.',
              customClass: { popup: 'sweetheart-theme' }
            });
            console.error('Erreur lors du rejet du véhicule :', error);
          }
        );
      }
    });
  }
}
