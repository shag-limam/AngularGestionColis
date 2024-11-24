import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule pour ngIf, ngFor, etc.
import { MatDialog } from '@angular/material/dialog';
import { LivreurService } from '../livreur.service';
import { Livreur } from '../../Model/livreur';
import { LivreurFormDialogComponent } from '../livreur-form-dialog/livreur-form-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { RouterModule } from '@angular/router'; // Importer RouterModule pour routerLink


@Component({
  selector: 'app-list-livreur',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './list-livreur.component.html',
  styleUrls: ['./list-livreur.component.css']
})
export class ListLivreurComponent implements OnInit {
  
  livreurs: Livreur[] = [];

  constructor(private livreurService: LivreurService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getLivreurs();
  }

  getLivreurs(): void {
    this.livreurService.getAllLivreurs().subscribe(
      (data: Livreur[]) => {
        this.livreurs = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des livreurs :', error);
      }
    );
  }

  openLivreurForm(livreur?: Livreur): void {
    const dialogRef = this.dialog.open(LivreurFormDialogComponent, {
      width: '400px',
      data: livreur ? livreur : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getLivreurs();
      }
    });
  }

  confirmDelete(livreurId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteLivreur(livreurId);
      }
    });
  }

  deleteLivreur(id: number): void {
    this.livreurService.deleteLivreur(id).subscribe(
      () => {
        this.getLivreurs();
      },
      (error) => {
        console.error('Erreur lors de la suppression du livreur :', error);
      }
    );
  }

  toggleLivreurStatus(livreur: Livreur): void {
    livreur.active = !livreur.active;
    this.livreurService.updateLivreurStatus(livreur.id, livreur.active).subscribe(
      () => {
        console.log(`Livreur ${livreur.id} statut mis à jour à ${livreur.active ? 'Actif' : 'Inactif'}`);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du statut du livreur :', error);
      }
    );
  }
}

