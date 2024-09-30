import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../Client.Service';  // Importer le service client
import { Client } from '../../Model/client';  // Importer le modèle Client

 
@Component({
  selector: 'app-client-form-dialog',
  templateUrl: './client-form-dialog.component.html',
  styleUrls: ['./client-form-dialog.component.css']
})
export class ClientFormDialogComponent implements OnInit {
  form!: FormGroup;
  clientId?: number;  // ID du client pour la modification
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    public dialogRef: MatDialogRef<ClientFormDialogComponent>,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: { client?: Client }  // Injecter les données pour l'édition
  ) { }

  ngOnInit(): void {
    // Initialisation du formulaire
    this.form = new FormGroup({
      fullName: new FormControl(this.data?.client?.fullName || '', [Validators.required]),
      email: new FormControl(this.data?.client?.email || '', [Validators.required, Validators.email]),
      address: new FormControl(this.data?.client?.address || '', Validators.required),
      phoneNumber: new FormControl(this.data?.client?.phoneNumber || '', Validators.required),
      password: new FormControl('', Validators.required),
      photo: new FormControl(null)
    });

    // Charger la prévisualisation de l'image si le client existe
    if (this.data?.client?.imageData) {
      this.imagePreview = 'data:' + this.data.client.imageData.type + ';base64,' + this.data.client.imageData.imageData;
    }

    // Récupérer l'ID si le client existe pour l'édition
    if (this.data?.client) {
      this.clientId = this.data.client.id;
    }
  }

  // Gérer la sélection d'un fichier
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Prévisualisation de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Soumettre le formulaire
  submit(): void {
    if (this.form.valid) {
      const clientData: Client = {
        ...this.form.value,
        id: this.clientId
      };

      const formData = new FormData();
      formData.append('client', JSON.stringify(clientData));

      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      }

      if (this.clientId) {
        // Si l'ID existe, c'est une modification
        this.clientService.updateClient(this.clientId, formData).subscribe(() => {
          this.dialogRef.close(true);  // Fermer la modale avec succès
        });
      } else {
        // Si pas d'ID, c'est une création
        this.clientService.createClient(formData).subscribe(() => {
          this.dialogRef.close(true);  // Fermer la modale avec succès
        });
      }
    }
  }

  // Méthode pour fermer la boîte modale sans soumettre
  cancel(): void {
    this.dialogRef.close(false);
  }
}
