import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule pour ngIf, ngFor, etc.
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LivreurService } from '../livreur.service';
import { Livreur } from '../../Model/livreur';
import { LivreurFormDialogComponent } from '../livreur-form-dialog/livreur-form-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { RouterModule } from '@angular/router'; // Importer RouterModule pour routerLink
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-livreur',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatPaginatorModule],
  templateUrl: './list-livreur.component.html',
  styleUrls: ['./list-livreur.component.css']
})
export class ListLivreurComponent implements OnInit {
  
  livreurs: Livreur[] = [];
  filteredLivreurs: Livreur[] = [];
  searchTerm: string = '';
  
  // Pagination properties
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 50];
  pageIndex = 0;
  displayedLivreurs: Livreur[] = [];

  constructor(
    private livreurService: LivreurService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadLivreurs();
  }

  loadLivreurs(): void {
    this.livreurService.getAllLivreurs().subscribe({
      next: (data) => {
        this.livreurs = data;
        this.filteredLivreurs = data;
        this.updateDisplayedLivreurs();
      },
      error: (error) => {
        this.toastr.error('Erreur lors du chargement des livreurs');
        console.error('Erreur:', error);
      }
    });
  }

  filterLivreurs(): void {
    if (!this.searchTerm.trim()) {
      this.filteredLivreurs = this.livreurs;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredLivreurs = this.livreurs.filter(livreur => 
        livreur.fullName.toLowerCase().includes(searchTermLower) ||
        livreur.licence.toLowerCase().includes(searchTermLower) ||
        livreur.phoneNumber.toLowerCase().includes(searchTermLower)
      );
    }
    this.updateDisplayedLivreurs();
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedLivreurs();
  }

  updateDisplayedLivreurs(): void {
    const startIndex = this.pageIndex * this.pageSize;
    this.displayedLivreurs = this.filteredLivreurs.slice(startIndex, startIndex + this.pageSize);
  }

  toggleLivreurStatus(livreur: Livreur): void {
    this.livreurService.updateLivreurStatus(livreur.id, !livreur.active).subscribe({
      next: (updatedLivreur) => {
        livreur.active = updatedLivreur.active;
        const status = livreur.active ? 'activé' : 'désactivé';
        this.toastr.success(`Le livreur a été ${status} avec succès`);
      },
      error: (error) => {
        this.toastr.error('Erreur lors de la mise à jour du statut');
        console.error('Erreur:', error);
      }
    });
  }

  openLivreurForm(livreur?: Livreur): void {
    const dialogRef = this.dialog.open(LivreurFormDialogComponent, {
      width: '600px',
      data: livreur || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadLivreurs();
      }
    });
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer ce livreur ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteLivreur(id);
      }
    });
  }

  private deleteLivreur(id: number): void {
    this.livreurService.deleteLivreur(id).subscribe({
      next: () => {
        this.toastr.success('Livreur supprimé avec succès');
        this.loadLivreurs();
      },
      error: (error) => {
        this.toastr.error('Erreur lors de la suppression du livreur');
        console.error('Erreur:', error);
      }
    });
  }
}
