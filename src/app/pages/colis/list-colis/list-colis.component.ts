import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule pour ngIf, ngFor, etc.
import { MatDialog } from '@angular/material/dialog';
import { ColisService } from '../colis.service';
import { Colis } from '../../Model/colis';
import { ColisFormDialogComponent } from '../colis-form-dialog/colis-form-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { RouterModule } from '@angular/router'; // Importer RouterModule pour routerLink

@Component({
  selector: 'app-list-colis',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-colis.component.html',
  styleUrls: ['./list-colis.component.css']
})
export class ListColisComponent implements OnInit {

  colis: Colis[] = [];

  constructor(private colisService: ColisService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getColis();
  }

  getColis(): void {
    this.colisService.getAllColis().subscribe(
      (data: Colis[]) => {
        this.colis = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des colis :', error);
      }
    );
  }

  openColisForm(colis?: Colis): void {
    const dialogRef = this.dialog.open(ColisFormDialogComponent, {
      width: '400px',
      data: colis ? colis : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getColis();
      }
    });
  }

  confirmDelete(colisId: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteColis(colisId);
      }
    });
  }

  deleteColis(id: number): void {
    this.colisService.deleteColis(id).subscribe(
      () => {
        this.getColis();
      },
      (error) => {
        console.error('Erreur lors de la suppression du colis :', error);
      }
    );
  }
}
