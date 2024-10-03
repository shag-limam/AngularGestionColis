import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivreurFormDialogComponent } from './livreur-form-dialog/livreur-form-dialog.component';
import { ShowLivreurComponent } from './show-livreur/show-livreur.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule, // Import de MatDialogModule
    MatButtonModule, // Import de MatButtonModule
    ReactiveFormsModule, // Import de ReactiveFormsModule pour les formulaires réactifs
  ],
  exports: [
  ]
})
export class LivreurModule { }




