// src/app/components/delete-confirmation-dialog/delete-confirmation-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>) {}

  // Méthode pour fermer le dialogue avec confirmation
  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  // Méthode pour fermer le dialogue sans suppression
  cancel(): void {
    this.dialogRef.close(false);
  }
}
