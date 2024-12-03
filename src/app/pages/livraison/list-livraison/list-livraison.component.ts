import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  imports: [CommonModule, RouterModule, FormsModule],

  templateUrl: './list-livraison.component.html',

  styleUrls: ['./list-livraison.component.scss']

})

export class ListLivraisonComponent implements OnInit {

  livraisons: Livraison[] = [];
  filteredLivraisons: Livraison[] = [];
  searchTerm: string = '';
  isLoading: boolean = false; // Indicateur de chargement
  errorMessage: string = '';  // Message d'erreur


  constructor(
    private livraisonService: LivraisonService,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadLivraisons();
  }


  loadLivraisons() {
    this.isLoading = true;
    this.livraisonService.getAllLivraisons().subscribe({
      next: (data) => {
        this.livraisons = data;
        this.filteredLivraisons = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des livraisons';
        this.isLoading = false;
        console.error('Error loading deliveries:', error);
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm?.trim()) {
      this.filteredLivraisons = [...this.livraisons];
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase().trim();
    this.filteredLivraisons = this.livraisons.filter(livraison => 
      (livraison.id?.toString().includes(searchTermLower)) ||
      (livraison.statut?.toLowerCase().includes(searchTermLower)) ||
      (livraison.livreur?.fullName?.toLowerCase().includes(searchTermLower)) ||
      (livraison.colis?.referenceSuivi?.toLowerCase().includes(searchTermLower))
    );
  }

  // Ouvrir le formulaire de création ou de mise à jour de livraison

  openLivraisonForm(livraison?: Livraison): void {

    const dialogRef = this.dialog.open(LivraisonFormDialogComponent, {

      width: '1000px', // Increased from 400px
      maxWidth: '100vw', // Added to ensure it doesn't overflow on smaller screens

      data: livraison ? livraison : null

    });


    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.loadLivraisons(); // Rafraîchir la liste après modification

      }

    });

  }


  // Demander confirmation avant suppression

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

        this.loadLivraisons(); // Rafraîchir la liste

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
