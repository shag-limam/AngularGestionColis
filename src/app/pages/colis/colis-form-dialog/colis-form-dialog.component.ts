import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColisService } from '../colis.service';
// import { ClientService } from '../../client.service';  // Import ClientService
import { ClientService } from '../../client/Client.Service';  // Import ClientService
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Client } from '../../Model/client';  // Import Client model

@Component({
  selector: 'app-colis-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './colis-form-dialog.component.html',
  styleUrls: ['./colis-form-dialog.component.css']
})
export class ColisFormDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  clients: Client[] = [];  // Liste des clients disponibles

  constructor(
    private fb: FormBuilder,
    private colisService: ColisService,
    private clientService: ClientService,
    public dialogRef: MatDialogRef<ColisFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data;

    this.form = this.fb.group({
      description: [data?.description || '', [Validators.required]],
      poids: [data?.poids || '', [Validators.required, Validators.min(0)]],
      adresseExpediteur: [data?.adresseExpediteur || '', [Validators.required]],
      adresseDestinataire: [data?.adresseDestinataire || '', [Validators.required]],
      dateExpedition: [data?.dateExpedition || '', [Validators.required]],
      dateLivraisonPrevue: [data?.dateLivraisonPrevue || '', [Validators.required]],
      clientId: [data?.clientId || '', [Validators.required]],  // Champ pour sélectionner le client
    });
  }

  ngOnInit(): void {
    // Charger les clients au chargement du composant
    this.clientService.getAllClients().subscribe(
      (data: Client[]) => {
        this.clients = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des clients :', error);
      }
    );
  }

  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submit(): void {
    if (this.form.valid) {
      const formData = new FormData();

      const colis = {
        description: this.form.value.description,
        poids: this.form.value.poids,
        adresseExpediteur: this.form.value.adresseExpediteur,
        adresseDestinataire: this.form.value.adresseDestinataire,
        dateExpedition: this.form.value.dateExpedition,
        dateLivraisonPrevue: this.form.value.dateLivraisonPrevue,
        clientId: this.form.value.clientId,  // ID du client sélectionné
      };

      formData.append('colis', JSON.stringify(colis));

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      if (this.isEditMode) {
        this.colisService.updateColis(this.data!.id, formData).subscribe(
          () => this.dialogRef.close(true),
          error => console.error('Erreur lors de la mise à jour du colis :', error)
        );
      } else {
        this.colisService.createColis(formData).subscribe(
          () => this.dialogRef.close(true),
          error => console.error('Erreur lors de la création du colis :', error)
        );
      }
    }
  }

  cancel(): void {
    this.dialogRef.close();  // Fermer la boîte de dialogue
  }
}
