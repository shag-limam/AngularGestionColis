import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculeService } from '../vehicule.service';
import { Vehicule } from '../../Model/vehicule';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-vehicules',
  templateUrl: './list-vehicules.component.html',
  styleUrls: ['./list-vehicules.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ListVehiculesComponent implements OnInit {

  vehicules: Vehicule[] = [];

  constructor(private vehiculeService: VehiculeService) { }

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

  // Afficher les détails du véhicule
  showVehiculeDetails(vehicule: Vehicule): void {
    let details = `
      <p><strong>Marque :</strong> ${vehicule.marque}</p>
      <p><strong>Modèle :</strong> ${vehicule.modele}</p>
      <p><strong>Immatriculation :</strong> ${vehicule.immatriculation}</p>
      <p><strong>Statut :</strong> ${vehicule.approuve ? 'Approuvé' : vehicule.rejected ? 'Rejeté' : 'En attente'}</p>
    `;

    if (vehicule.assurance?.imageData) {
      details += `<p><strong>Assurance :</strong><br><img src="data:${vehicule.assurance.type};base64,${vehicule.assurance.imageData}" alt="Assurance" class="zoomable" width="100" (click)="showImageModal('data:${vehicule.assurance.type};base64,${vehicule.assurance.imageData}', 'Assurance')" /></p>`;
    } else {
      details += `<p><strong>Assurance :</strong> Non disponible</p>`;
    }

    if (vehicule.carteGrise?.imageData) {
      details += `<p><strong>Carte Grise :</strong><br><img src="data:${vehicule.carteGrise.type};base64,${vehicule.carteGrise.imageData}" alt="Carte Grise" class="zoomable" width="100" (click)="showImageModal('data:${vehicule.carteGrise.type};base64,${vehicule.carteGrise.imageData}', 'Carte Grise')" /></p>`;
    } else {
      details += `<p><strong>Carte Grise :</strong> Non disponible</p>`;
    }

    if (vehicule.photos && vehicule.photos.length > 0) {
      details += `<p><strong>Photos :</strong></p>`;
      vehicule.photos.forEach(photo => {
        details += `<img src="data:${photo.type};base64,${photo.imageData}" alt="Photo" class="zoomable" width="100" style="margin-right: 5px;" (click)="showImageModal('data:${photo.type};base64,${photo.imageData}', 'Photo')" />`;
      });
    } else {
      details += `<p><strong>Photos :</strong> Non disponibles</p>`;
    }

    Swal.fire({
      title: `Détails du véhicule (ID: ${vehicule.id})`,
      html: details,
      customClass: { popup: 'sweetheart-theme' }
    });
  }

  // Afficher l'image agrandie dans un modal
  showImageModal(imageUrl: string, title: string): void {
    Swal.fire({
      title: title,
      imageUrl: imageUrl,
      imageAlt: title,
      imageWidth: 'auto',
      imageHeight: 'auto',
      showCloseButton: true,
      customClass: { popup: 'sweetheart-theme' }
    });
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

// export class ListVehiculesComponent implements OnInit {

//   vehicules: Vehicule[] = [];

//   constructor(private vehiculeService: VehiculeService) { }

//   ngOnInit(): void {
//     this.getAllVehicules();
//   }

//   // Récupérer la liste des véhicules
//   getAllVehicules(): void {
//     this.vehiculeService.getAllVehicules().subscribe(
//       (data: Vehicule[]) => {
//         this.vehicules = data;
//       },
//       error => {
//         console.error('Erreur lors de la récupération des véhicules :', error);
//       }
//     );
//   }

//   // Afficher les détails du véhicule
//   showVehiculeDetails(vehicule: Vehicule): void {
//     let details = `
//       <p><strong>Marque :</strong> ${vehicule.marque}</p>
//       <p><strong>Modèle :</strong> ${vehicule.modele}</p>
//       <p><strong>Immatriculation :</strong> ${vehicule.immatriculation}</p>
//       <p><strong>Statut :</strong> ${vehicule.approuve ? 'Approuvé' : vehicule.rejected ? 'Rejeté' : 'En attente'}</p>
//     `;

//     if (vehicule.assurance?.imageData) {
//         details += `<p><strong>Assurance :</strong><br><img src="data:${vehicule.assurance.type};base64,${vehicule.assurance.imageData}" alt="Assurance" class="zoomable" width="100" style="cursor: pointer;" onclick="showImageModal('data:${vehicule.assurance.type};base64,${vehicule.assurance.imageData}', 'Assurance')" /></p>`;
//     } else {
//         details += `<p><strong>Assurance :</strong> Non disponible</p>`;
//     }

//     if (vehicule.carteGrise?.imageData) {
//         details += `<p><strong>Carte Grise :</strong><br><img src="data:${vehicule.carteGrise.type};base64,${vehicule.carteGrise.imageData}" alt="Carte Grise" class="zoomable" width="100" style="cursor: pointer;" onclick="showImageModal('data:${vehicule.carteGrise.type};base64,${vehicule.carteGrise.imageData}', 'Carte Grise')" /></p>`;
//     } else {
//         details += `<p><strong>Carte Grise :</strong> Non disponible</p>`;
//     }

//     if (vehicule.photos && vehicule.photos.length > 0) {
//         details += `<p><strong>Photos :</strong></p>`;
//         vehicule.photos.forEach(photo => {
//             details += `<img src="data:${photo.type};base64,${photo.imageData}" alt="Photo" class="zoomable" width="100" style="margin-right: 5px; cursor: pointer;" onclick="showImageModal('data:${photo.type};base64,${photo.imageData}', 'Photo')" />`;
//         });
//     } else {
//         details += `<p><strong>Photos :</strong> Non disponibles</p>`;
//     }

//     Swal.fire({
//         title: `Détails du véhicule (ID: ${vehicule.id})`,
//         html: details,
//         customClass: { popup: 'sweetheart-theme' }
//     });
// }

// // Méthode pour afficher une image en plein écran
// showImageModal(imageUrl: string, title: string): void {
//     Swal.fire({
//         title: title,
//         imageUrl: imageUrl,
//         imageAlt: title,
//         imageWidth: 'auto',
//         imageHeight: 'auto',
//         showCloseButton: true,
//         customClass: { popup: 'sweetheart-theme' }
//     });
// }



//   // showVehiculeDetails(vehicule: Vehicule): void {
//   //   let details = `
//   //     <p><strong>Marque :</strong> ${vehicule.marque}</p>
//   //     <p><strong>Modèle :</strong> ${vehicule.modele}</p>
//   //     <p><strong>Immatriculation :</strong> ${vehicule.immatriculation}</p>
//   //     <p><strong>Statut :</strong> ${vehicule.approuve ? 'Approuvé' : vehicule.rejected ? 'Rejeté' : 'En attente'}</p>
//   //     <p><strong>Assurance :</strong> ${vehicule.assurance?.name || 'Non disponible'}</p>
//   //     <p><strong>Carte Grise :</strong> ${vehicule.carteGrise?.name || 'Non disponible'}</p>
//   //     <p><strong>Photos :</strong> ${vehicule.photos?.length || 0} photos disponibles</p>
//   //   `;
//   //   Swal.fire({
//   //     title: `Détails du véhicule (ID: ${vehicule.id})`,
//   //     html: details,
//   //     customClass: { popup: 'sweetheart-theme' }
//   //   });
//   // }

//   // Accepter un véhicule
//   approveVehicule(vehiculeId: number): void {
//     this.vehiculeService.approveVehicule(vehiculeId).subscribe(
//       () => this.getAllVehicules(),
//       error => console.error('Erreur lors de l\'approbation du véhicule :', error)
//     );
//   }

//   // Rejeter un véhicule avec un motif
//   rejectVehicule(vehiculeId: number): void {
//     Swal.fire({
//       title: 'Rejeter le véhicule',
//       input: 'text',
//       inputLabel: 'Entrez un motif de rejet',
//       showCancelButton: true,
//       confirmButtonText: 'Rejeter',
//       cancelButtonText: 'Annuler',
//       customClass: { popup: 'sweetheart-theme' }
//     }).then((result) => {
//       if (result.isConfirmed && result.value) {
//         this.vehiculeService.rejectVehicule(vehiculeId, result.value).subscribe(
//           () => {
//             Swal.fire({
//               icon: 'success',
//               title: 'Rejeté',
//               text: 'Le véhicule a été rejeté avec succès.',
//               customClass: { popup: 'sweetheart-theme' }
//             });
//             this.getAllVehicules();
//           },
//           error => {
//             Swal.fire({
//               icon: 'error',
//               title: 'Erreur',
//               text: 'Erreur lors du rejet du véhicule.',
//               customClass: { popup: 'sweetheart-theme' }
//             });
//             console.error('Erreur lors du rejet du véhicule :', error);
//           }
//         );
//       }
//     });
//   }
// }
