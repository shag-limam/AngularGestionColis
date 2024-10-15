import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  // Confirmer la suppression
  confirmDelete(): void {
    this.dialogRef.close(true);  // Renvoie 'true' si la suppression est confirmée
  }

  // Annuler la suppression
  cancel(): void {
    this.dialogRef.close(false);  // Renvoie 'false' si la suppression est annulée
  }
}