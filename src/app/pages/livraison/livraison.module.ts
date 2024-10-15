// src/app/pages/livraison/livraison.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { ListLivraisonComponent } from './list-livraison/list-livraison.component';
import { ShowLivraisonComponent } from './show-livraison/show-livraison.component';
import { LivraisonFormDialogComponent } from './livraison-form-dialog/livraison-form-dialog.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    ListLivraisonComponent,
    ShowLivraisonComponent,
    LivraisonFormDialogComponent,
    DeleteConfirmationDialogComponent
  ],
  exports: [
    ListLivraisonComponent,
    ShowLivraisonComponent,
    LivraisonFormDialogComponent,
    DeleteConfirmationDialogComponent
  ]
})
export class LivraisonModule { }
