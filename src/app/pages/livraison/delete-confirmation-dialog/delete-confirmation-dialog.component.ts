import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule, // Import necessary for mat-dialog-content, mat-dialog-actions
    MatButtonModule  // Import necessary for Material buttons
  ],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})
export class DeleteConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>) {}

  confirmDelete(): void {
    this.dialogRef.close(true); // Close the dialog and return 'true' to confirm
  }

  cancel(): void {
    this.dialogRef.close(false); // Close the dialog and return 'false' to cancel
  }
}
