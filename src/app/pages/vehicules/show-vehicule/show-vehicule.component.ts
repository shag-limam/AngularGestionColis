// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { VehiculeService } from '../vehicule.service';
// import { Vehicule } from '../../Model/vehicule';
// import Swal from 'sweetalert2';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-show-vehicule',
//   templateUrl: './show-vehicule.component.html',
//   styleUrls: ['./show-vehicule.component.scss'],
//   standalone: true,
//   imports: [CommonModule]
// })
// export class ShowVehiculeComponent implements OnInit {
//   vehicule!: Vehicule;
//   mainImage: string = '';  // Image principale actuellement affichée
//   mainImageTitle: string = '';  // Titre de l'image principale

//   constructor(
//     private route: ActivatedRoute,
//     private vehiculeService: VehiculeService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     const vehiculeId = +this.route.snapshot.paramMap.get('vehiculeId')!;
//     this.getVehiculeDetails(vehiculeId);
//   }

//   // Récupérer les détails du véhicule
//   getVehiculeDetails(id: number): void {
//     this.vehiculeService.getVehiculeById(id).subscribe({
//       next: (data: Vehicule) => {
//         this.vehicule = data;
//         // Initialiser l'image principale avec la première photo si disponible
//         if (this.vehicule.photos && this.vehicule.photos.length > 0) {
//           const firstPhoto = this.vehicule.photos[0];
//           this.mainImage = `data:${firstPhoto.type};base64,${firstPhoto.imageData}`;
//           this.mainImageTitle = 'Photo 1';
//         }
//       },
//       error: (err) => {
//         console.error('Erreur lors de la récupération des détails du véhicule:', err);
//       }
//     });
//   }

//   // Changer l'image principale avec son titre
//   changeMainImage(imageData: string, imageType: string, title: string): void {
//     this.mainImage = `data:${imageType};base64,${imageData}`;
//     this.mainImageTitle = title;
//   }

//   // Afficher le PDF dans une alerte modale SweetAlert2
//   showPdfInModal(pdfBase64: string, title: string): void {
//     const pdfBlob = this.base64ToBlob(pdfBase64, 'application/pdf');
//     const pdfUrl = URL.createObjectURL(pdfBlob);

//     Swal.fire({
//       title: title,
//       html: `<iframe src="${pdfUrl}" width="100%" height="500px"></iframe>`,
//       width: 800,
//       showCloseButton: true,
//       showConfirmButton: false
//     }).then(() => {
//       URL.revokeObjectURL(pdfUrl); // Libérer l'URL une fois l'alerte fermée
//     });
//   }

//   // Convertir Base64 en Blob
//   private base64ToBlob(base64: string, type: string): Blob {
//     const byteCharacters = atob(base64);
//     const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
//     const byteArray = new Uint8Array(byteNumbers);
//     return new Blob([byteArray], { type });
//   }

//   // Méthode pour retourner à la liste des véhicules
//   goBack(): void {
//     this.router.navigate(['/vehicules']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculeService } from '../vehicule.service';
import { Vehicule } from '../../Model/vehicule';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-vehicule',
  templateUrl: './show-vehicule.component.html',
  styleUrls: ['./show-vehicule.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ShowVehiculeComponent implements OnInit {
  vehicule!: Vehicule;
  mainImage: string = '';  // Image principale actuellement affichée
  mainImageTitle: string = '';  // Titre de l'image principale

  constructor(
    private route: ActivatedRoute,
    private vehiculeService: VehiculeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const vehiculeId = +this.route.snapshot.paramMap.get('vehiculeId')!;
    this.getVehiculeDetails(vehiculeId);
  }

  // Récupérer les détails du véhicule
  getVehiculeDetails(id: number): void {
    this.vehiculeService.getVehiculeById(id).subscribe({
      next: (data: Vehicule) => {
        this.vehicule = data;
        if (this.vehicule.photos && this.vehicule.photos.length > 0) {
          const firstPhoto = this.vehicule.photos[0];
          this.mainImage = `data:${firstPhoto.type};base64,${firstPhoto.imageData}`;
          this.mainImageTitle = 'Photo 1';
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails du véhicule:', err);
      }
    });
  }

  // Approuver le véhicule
  approveVehicule(): void {
    this.vehiculeService.approveVehicule(this.vehicule.id).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Véhicule approuvé',
          text: 'Le véhicule a été approuvé avec succès.',
          customClass: { popup: 'sweetheart-theme' }
        });
        this.getVehiculeDetails(this.vehicule.id); // Mettre à jour les détails
      },
      error => {
        console.error('Erreur lors de l\'approbation du véhicule :', error);
      }
    );
  }

  // Rejeter le véhicule avec un motif
  rejectVehicule(): void {
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
        this.vehiculeService.rejectVehicule(this.vehicule.id, result.value).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Véhicule rejeté',
              text: 'Le véhicule a été rejeté avec succès.',
              customClass: { popup: 'sweetheart-theme' }
            });
            this.getVehiculeDetails(this.vehicule.id); // Mettre à jour les détails
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

  // Changer l'image principale avec son titre
  changeMainImage(imageData: string, imageType: string, title: string): void {
    this.mainImage = `data:${imageType};base64,${imageData}`;
    this.mainImageTitle = title;
  }

  // Afficher le PDF dans une alerte modale SweetAlert2
  showPdfInModal(pdfBase64: string, title: string): void {
    const pdfBlob = this.base64ToBlob(pdfBase64, 'application/pdf');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    Swal.fire({
      title: title,
      html: `<iframe src="${pdfUrl}" width="100%" height="500px"></iframe>`,
      width: 800,
      showCloseButton: true,
      showConfirmButton: false
    }).then(() => {
      URL.revokeObjectURL(pdfUrl);
    });
  }

  private base64ToBlob(base64: string, type: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
  }

  // Méthode pour retourner à la liste des véhicules
  goBack(): void {
    this.router.navigate(['/vehicules']);
  }
}
