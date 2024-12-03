// src/app/pages/livraison/livraison.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ListLivraisonComponent } from './list-livraison/list-livraison.component';
import { ShowLivraisonComponent } from './show-livraison/show-livraison.component';
import { LivraisonFormDialogComponent } from './livraison-form-dialog/livraison-form-dialog.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';

@NgModule({
  declarations: [
    ListLivraisonComponent,
    ShowLivraisonComponent,
    LivraisonFormDialogComponent,
    DeleteConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    ListLivraisonComponent,
    ShowLivraisonComponent,
    LivraisonFormDialogComponent,
    DeleteConfirmationDialogComponent
  ]
})
export class LivraisonModule { }
