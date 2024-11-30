import { Component, Inject, HostListener, ElementRef, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LivreurService } from '../livreur.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-livreur-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './livreur-form-dialog.component.html',
  styleUrls: ['./livreur-form-dialog.component.css']
})
export class LivreurFormDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  private ignoreFirstClickOutside = true; // Ignorer le premier clic extérieur pour éviter la fermeture immédiate

  constructor(
    private fb: FormBuilder,
    private livreurService: LivreurService,
    public dialogRef: MatDialogRef<LivreurFormDialogComponent>,
    private elementRef: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data;

    // Initialiser le formulaire avec les champs nécessaires
    this.form = this.fb.group({
      fullName: [data?.fullName || '', [Validators.required]],
      email: [data?.email || '', [Validators.required, Validators.email]],
      licence: [data?.licence || '', [Validators.required]],
      phoneNumber: [data?.phoneNumber || '', [Validators.required]],
      address: [data?.address || '', [Validators.required]],
      password: [null, this.isEditMode ? [] : [Validators.required, Validators.minLength(5)]]
    });

    // Initialiser l'aperçu de l'image si disponible
    if (this.isEditMode && data?.imageData?.imageData) {
      this.imagePreview = `data:image/jpeg;base64,${data.imageData.imageData}`;
    }
  }

  ngOnInit(): void {
    // Activer la détection de clic extérieur après un court délai
    setTimeout(() => {
      this.ignoreFirstClickOutside = false;
    }, 300); // Délai de 300 ms
  }

  // Gestion de l'événement de changement de fichier
  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Générer une prévisualisation de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Méthode de soumission du formulaire
  submit(): void {
    if (this.form.valid) {
      const formData = new FormData();

      const livreur = {
        fullName: this.form.value.fullName,
        email: this.form.value.email,
        licence: this.form.value.licence,
        phoneNumber: this.form.value.phoneNumber,
        address: this.form.value.address,
        password: !this.isEditMode ? this.form.value.password : undefined
      };

      formData.append('livreur', JSON.stringify(livreur));

      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      }

      if (this.isEditMode) {
        // Appel API pour mettre à jour le livreur
        this.livreurService.updateLivreur(this.data!.id, formData).subscribe(
          () => this.dialogRef.close(true),
          error => console.error('Erreur lors de la mise à jour du livreur :', error)
        );
      } else {
        // Appel API pour créer un livreur
        this.livreurService.createLivreur(formData).subscribe(
          () => this.dialogRef.close(true),
          error => console.error('Erreur lors de la création du livreur :', error)
        );
      }
    }
  }

  cancel(): void {
    this.dialogRef.close(); // Fermer la boîte de dialogue
  }

  // Écouteur global pour détecter les clics en dehors de la boîte de dialogue
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Ignorer le premier clic extérieur
    if (this.ignoreFirstClickOutside) return;

    // Vérifier si le clic est à l'intérieur de la boîte de dialogue
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.dialogRef.close(); // Fermer la boîte de dialogue si le clic est extérieur
    }
  }
}
