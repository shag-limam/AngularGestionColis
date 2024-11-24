import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LivraisonService } from '../livraison.service';
import { Livraison } from '../../Model/livraison';
import { LivraisonFormDialogComponent } from '../livraison-form-dialog/livraison-form-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-livraison',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './list-livraison.component.html',
  styleUrls: ['./list-livraison.component.scss']
})
export class ListLivraisonComponent implements OnInit {

  livraisons: Livraison[] = [];
  isLoading: boolean = false; // Indicateur de chargement
  errorMessage: string = '';  // Message d'erreur

  constructor(
    private livraisonService: LivraisonService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getLivraisons();
  }

  // Récupérer la liste des livraisons
  getLivraisons(): void {
    this.isLoading = true;  // Activer le chargement
    this.livraisonService.getAllLivraisons().subscribe(
      (data: Livraison[]) => {
        this.livraisons = data;
        this.isLoading = false;  // Désactiver le chargement après récupération
      },
      (error) => {
        console.error('Erreur lors de la récupération des livraisons :', error);
        this.errorMessage = 'Une erreur est survenue lors du chargement des livraisons.';  // Message d'erreur
        this.isLoading = false;
      }
    );
  }

  // Ouvrir le formulaire de création ou de mise à jour de livraison
  openLivraisonForm(livraison?: Livraison): void {
    const dialogRef = this.dialog.open(LivraisonFormDialogComponent, {
      width: '400px',
      data: livraison ? livraison : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getLivraisons(); // Rafraîchir la liste après modification
      }
    });
  }

  // Demander confirmation avant suppression
  // confirmDelete(livraisonId: number): void {
  //   const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
  //     width: '300px',
  //     data: { message: 'Êtes-vous sûr de vouloir supprimer cette livraison ?' }
  //   });

    

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === true) {
  //       this.deleteLivraison(livraisonId);
  //     }
  //   });
  // }
  confirmDelete(livraisonId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Cette action supprimera la livraison définitivement!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteLivraison(livraisonId); // Appeler la méthode de suppression si confirmé
      }
    });
  }
  
  
  deleteLivraison(id: number): void {
    this.livraisonService.deleteLivraison(id).subscribe(
      () => {
        this.getLivraisons(); // Rafraîchir la liste
        Swal.fire({
          title: 'Supprimé!',
          text: 'La livraison a été supprimée avec succès.',
          icon: 'success',
          timer: 1250,  // L'alerte disparaît après 5 secondes (5000 ms)
          showConfirmButton: false  // Désactiver le bouton "OK" pour rendre l'alerte auto-dismiss
        });
      },
      (error) => {
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur est survenue lors de la suppression.',
          icon: 'error',
          timer: 5000,  // L'alerte disparaît après 5 secondes
          showConfirmButton: false
        });
      }
    );
  }
  
}

// import { Component, OnInit, HostListener } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { LivraisonService } from '../livraison.service';
// import { Livraison } from '../../Model/livraison';
// import { LivraisonFormDialogComponent } from '../livraison-form-dialog/livraison-form-dialog.component';
// import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
// import { RouterModule } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-list-livraison',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './list-livraison.component.html',
//   styleUrls: ['./list-livraison.component.scss']
// })
// export class ListLivraisonComponent implements OnInit {

//   livraisons: Livraison[] = [];
//   isLoading: boolean = false; // Indicateur de chargement
//   errorMessage: string = '';  // Message d'erreur
//   private dialogRef: MatDialogRef<LivraisonFormDialogComponent> | null = null;
//   private ignoreClick = false;

//   constructor(
//     private livraisonService: LivraisonService,
//     public dialog: MatDialog
//   ) {}

//   ngOnInit(): void {
//     this.getLivraisons();
//   }

//   // Récupérer la liste des livraisons
//   getLivraisons(): void {
//     this.isLoading = true;
//     this.livraisonService.getAllLivraisons().subscribe(
//       (data: Livraison[]) => {
//         this.livraisons = data;
//         this.isLoading = false;
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des livraisons :', error);
//         this.errorMessage = 'Une erreur est survenue lors du chargement des livraisons.';
//         this.isLoading = false;
//       }
//     );
//   }

//   // Ouvrir le formulaire de création ou de mise à jour de livraison
//   openLivraisonForm(livraison?: Livraison): void {
//     console.log('Ouverture du formulaire de livraison');

//     // Ouvrir la boîte de dialogue et stocker la référence
//     this.dialogRef = this.dialog.open(LivraisonFormDialogComponent, {
//       width: '400px',
//       data: livraison || null,
//       disableClose: true
//     });

//     // Ignorer le premier clic après l'ouverture de la boîte de dialogue
//     this.ignoreClick = true;
//     setTimeout(() => {
//       this.ignoreClick = false;
//     }, 100); // Attendre 100 ms pour ignorer le premier clic

//     // Détecter la fermeture de la boîte de dialogue
//     this.dialogRef.afterClosed().subscribe(result => {
//       console.log('Boîte de dialogue fermée avec le résultat:', result);
//       if (result) {
//         this.getLivraisons();
//       }
//       this.dialogRef = null; // Réinitialiser la référence de la boîte de dialogue
//     });
//   }

//   // Écouteur global de clic qui ferme la boîte de dialogue au clic sur n'importe quel élément
//   @HostListener('document:click', ['$event'])
//   onDocumentClick(event: Event): void {
//     if (this.ignoreClick) {
//       console.log('Premier clic ignoré après l’ouverture de la boîte de dialogue');
//       return;
//     }

//     console.log('Clic détecté sur le document', event);
//     if (this.dialogRef) {
//       this.dialogRef.close(); // Fermer la boîte de dialogue
//       console.log('Boîte de dialogue fermée suite à un clic');
//     }
//   }

//   // Confirmation de suppression avec SweetAlert2
//   confirmDelete(livraisonId: number): void {
//     Swal.fire({
//       title: 'Êtes-vous sûr?',
//       text: "Cette action supprimera la livraison définitivement!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Oui, supprimer!',
//       cancelButtonText: 'Annuler'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.deleteLivraison(livraisonId); // Appeler la méthode de suppression si confirmé
//       }
//     });
//   }
  
//   // Méthode de suppression
//   deleteLivraison(id: number): void {
//     this.livraisonService.deleteLivraison(id).subscribe(
//       () => {
//         this.getLivraisons(); // Rafraîchir la liste
//         Swal.fire({
//           title: 'Supprimé!',
//           text: 'La livraison a été supprimée avec succès.',
//           icon: 'success',
//           timer: 1250,
//           showConfirmButton: false
//         });
//       },
//       (error) => {
//         Swal.fire({
//           title: 'Erreur!',
//           text: 'Une erreur est survenue lors de la suppression.',
//           icon: 'error',
//           timer: 5000,
//           showConfirmButton: false
//         });
//       }
//     );
//   }
// }
