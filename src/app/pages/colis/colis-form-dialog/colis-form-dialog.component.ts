// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ColisService } from '../colis.service';
// import { ClientService } from '../../client/Client.Service';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialogModule } from '@angular/material/dialog';
// import { Client } from '../../Model/client';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-colis-form-dialog',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatButtonModule,
//     MatDialogModule
//   ],
//   templateUrl: './colis-form-dialog.component.html',
//   styleUrls: ['./colis-form-dialog.component.css']
// })
// export class ColisFormDialogComponent implements OnInit {
//   form: FormGroup;
//   isEditMode = false;
//   selectedFile: File | null = null;
//   imagePreview: string | ArrayBuffer | null = null;
//   clients: Client[] = [];

//   constructor(
//     private fb: FormBuilder,
//     private colisService: ColisService,
//     private clientService: ClientService,
//     public dialogRef: MatDialogRef<ColisFormDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.isEditMode = !!data;

//     const today = new Date();
//     this.form = this.fb.group({
//       description: [data?.description || '', [Validators.required]],
//       poids: [data?.poids || '', [Validators.required, Validators.min(0)]],
//       adresseExpediteur: [data?.adresseExpediteur || '', [Validators.required]],
//       adresseDestinataire: [data?.adresseDestinataire || '', [Validators.required]],
//       dateExpedition: [data?.dateExpedition || today.toISOString().split('T')[0], [Validators.required]],
//       dateLivraisonPrevue: [
//         data?.dateLivraisonPrevue || today.toISOString().split('T')[0],
//         [Validators.required]
//       ],
//       clientId: [data?.clientId || '', [Validators.required]]
//     });
//   }

//   ngOnInit(): void {
//     // Charger la liste des clients
//     this.clientService.getAllClients().subscribe(
//       (data: Client[]) => {
//         this.clients = data;
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des clients :', error);
//       }
//     );

//     // S'assurer que la date de livraison prévue n'accepte pas une date antérieure à aujourd'hui
//     this.form.get('dateLivraisonPrevue')?.valueChanges.subscribe(value => {
//       const today = new Date().toISOString().split('T')[0];
//       if (value < today) {
//         this.form.get('dateLivraisonPrevue')?.setValue(today);
//       }
//     });
//   }

//   onFileChange(event: any): void {
//     const file: File = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;

//       const reader = new FileReader();
//       reader.onload = () => {
//         this.imagePreview = reader.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   submit(): void {
//     if (this.form.valid) {
//       const formData = new FormData();

//       const colis = {
//         description: this.form.value.description,
//         poids: this.form.value.poids,
//         adresseExpediteur: this.form.value.adresseExpediteur,
//         adresseDestinataire: this.form.value.adresseDestinataire,
//         dateExpedition: this.form.value.dateExpedition,
//         dateLivraisonPrevue: this.form.value.dateLivraisonPrevue,
//         clientId: this.form.value.clientId
//       };

//       formData.append('colis', JSON.stringify(colis));
//       if (this.selectedFile) {
//         formData.append('image', this.selectedFile);
//       }

//       // Utilisation de SweetAlert pour améliorer l'expérience utilisateur
//       if (this.isEditMode) {
//         this.colisService.updateColis(this.data!.id, formData).subscribe(
//           () => {
//             Swal.fire('Succès', 'Le colis a été mis à jour avec succès !', 'success');
//             this.dialogRef.close(true);
//           },
//           error => {
//             console.error('Erreur lors de la mise à jour du colis :', error);
//             Swal.fire('Erreur', 'Échec de la mise à jour du colis.', 'error');
//           }
//         );
//       } else {
//         this.colisService.createColis(formData).subscribe(
//           () => {
//             Swal.fire('Succès', 'Le colis a été créé avec succès !', 'success');
//             this.dialogRef.close(true);
//           },
//           error => {
//             console.error('Erreur lors de la création du colis :', error);
//             Swal.fire('Erreur', 'Échec de la création du colis.', 'error');
//           }
//         );
//       }
//     }
//   }

//   cancel(): void {
//     this.dialogRef.close();
//   }
// }
// colis-form-dialog.component.ts

import { Component, Inject, OnInit, HostListener, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColisService } from '../colis.service';
import { ClientService } from '../../client/Client.Service';
import { Client } from '../../Model/client';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-colis-form-dialog',
  templateUrl: './colis-form-dialog.component.html',
  styleUrls: ['./colis-form-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class ColisFormDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  clients: Client[] = [];
  today: string = new Date().toISOString().split('T')[0]; // Date actuelle au format YYYY-MM-DD
  private ignoreFirstClickOutside = true;

  constructor(
    private fb: FormBuilder,
    private colisService: ColisService,
    private clientService: ClientService,
    public dialogRef: MatDialogRef<ColisFormDialogComponent>,
    private elementRef: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Désactiver la fermeture par clic en dehors et par ESC
    dialogRef.disableClose = true;
    this.isEditMode = !!data;

    this.form = this.fb.group({
      description: [data?.description || '', [Validators.required]],
      poids: [data?.poids || '', [Validators.required, Validators.min(0.1)]],
      adresseExpediteur: [data?.adresseExpediteur || '', [Validators.required]],
      adresseDestinataire: [data?.adresseDestinataire || '', [Validators.required]],
      dateExpedition: [data?.dateExpedition || this.today, [Validators.required]],
      dateLivraisonPrevue: [data?.dateLivraisonPrevue || this.today, [Validators.required]],
      clientId: [data?.clientId || '', [Validators.required]]
    }, { validators: [this.validateDates, this.validateAddresses] });
  }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(
      (data: Client[]) => {
        this.clients = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des clients :', error);
      }
    );

    // Activer le clic extérieur après un délai
    setTimeout(() => {
      this.ignoreFirstClickOutside = false;
    }, 300); // Attendre 300 ms pour ignorer le premier clic
  }

  // Validation personnalisée pour vérifier que l'adresse d'expédition est différente de l'adresse de destination
  validateAddresses(control: AbstractControl): ValidationErrors | null {
    const adresseExpediteur = control.get('adresseExpediteur')?.value;
    const adresseDestinataire = control.get('adresseDestinataire')?.value;
    
    if (adresseExpediteur && adresseDestinataire && adresseExpediteur === adresseDestinataire) {
      return { sameAddress: true }; // Erreur si les adresses sont identiques
    }
    
    return null;
  }

  // Validation personnalisée pour vérifier que la date d'expédition est antérieure ou égale à la date de livraison
  validateDates(control: AbstractControl): ValidationErrors | null {
    const dateExpedition = control.get('dateExpedition')?.value;
    const dateLivraisonPrevue = control.get('dateLivraisonPrevue')?.value;

    if (dateExpedition && dateLivraisonPrevue && dateExpedition > dateLivraisonPrevue) {
      return { invalidDateOrder: true }; // Erreur si la date d'expédition est après la date de livraison
    }

    return null;
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
        clientId: this.form.value.clientId
      };

      formData.append('colis', JSON.stringify(colis));

      if (this.isEditMode) {
        this.colisService.updateColis(this.data!.id, formData).subscribe(
          () => {
            Swal.fire('Succès', 'Le colis a été mis à jour avec succès !', 'success');
            this.dialogRef.close(true);
          },
          error => {
            console.error('Erreur lors de la mise à jour du colis :', error);
            Swal.fire('Erreur', 'Échec de la mise à jour du colis.', 'error');
          }
        );
      } else {
        this.colisService.createColis(formData).subscribe(
          () => {
            Swal.fire('Succès', 'Le colis a été créé avec succès !', 'success');
            this.dialogRef.close(true);
          },
          error => {
            console.error('Erreur lors de la création du colis :', error);
            Swal.fire('Erreur', 'Échec de la création du colis.', 'error');
          }
        );
      }
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  // Écouteur global pour détecter les clics en dehors de la boîte de dialogue
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.ignoreFirstClickOutside) return;

    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.dialogRef.close();
    }
  }
}


// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ColisService } from '../colis.service';
// import { ClientService } from '../../client/Client.Service';
// import { Client } from '../../Model/client';
// import Swal from 'sweetalert2';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialogModule } from '@angular/material/dialog';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';

// @Component({
//   selector: 'app-colis-form-dialog',
//   templateUrl: './colis-form-dialog.component.html',
//   styleUrls: ['./colis-form-dialog.component.css'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatButtonModule,
//     MatDialogModule,
//     MatInputModule,
//     MatSelectModule
//   ]
// })
// export class ColisFormDialogComponent implements OnInit {
//   form: FormGroup;
//   isEditMode = false;
//   clients: Client[] = [];
//   today: string = new Date().toISOString().split('T')[0]; // Date actuelle au format YYYY-MM-DD

//   constructor(
//     private fb: FormBuilder,
//     private colisService: ColisService,
//     private clientService: ClientService,
//     public dialogRef: MatDialogRef<ColisFormDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     // Désactiver la fermeture par clic en dehors et par ESC
//     dialogRef.disableClose = true;
//     this.isEditMode = !!data;

//     this.form = this.fb.group({
//       description: [data?.description || '', [Validators.required]],
//       poids: [data?.poids || '', [Validators.required, Validators.min(0.1)]], // Poids positif
//       adresseExpediteur: [data?.adresseExpediteur || '', [Validators.required]],
//       adresseDestinataire: [data?.adresseDestinataire || '', [Validators.required]],
//       dateExpedition: [data?.dateExpedition || this.today, [Validators.required]],
//       dateLivraisonPrevue: [data?.dateLivraisonPrevue || this.today, [Validators.required]],
//       clientId: [data?.clientId || '', [Validators.required]]
//     }, { validators: [this.validateDates, this.validateAddresses] }); // Ajout de validations personnalisées
//   }

//   ngOnInit(): void {
//     this.clientService.getAllClients().subscribe(
//       (data: Client[]) => {
//         this.clients = data;
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des clients :', error);
//       }
//     );
//   }

//   // Validation personnalisée pour vérifier que l'adresse d'expédition est différente de l'adresse de destination
//   validateAddresses(control: AbstractControl): ValidationErrors | null {
//     const adresseExpediteur = control.get('adresseExpediteur')?.value;
//     const adresseDestinataire = control.get('adresseDestinataire')?.value;
    
//     if (adresseExpediteur && adresseDestinataire && adresseExpediteur === adresseDestinataire) {
//       return { sameAddress: true }; // Erreur si les adresses sont identiques
//     }
    
//     return null;
//   }

//   // Validation personnalisée pour vérifier que la date d'expédition est antérieure ou égale à la date de livraison
//   validateDates(control: AbstractControl): ValidationErrors | null {
//     const dateExpedition = control.get('dateExpedition')?.value;
//     const dateLivraisonPrevue = control.get('dateLivraisonPrevue')?.value;

//     if (dateExpedition && dateLivraisonPrevue && dateExpedition > dateLivraisonPrevue) {
//       return { invalidDateOrder: true }; // Erreur si la date d'expédition est après la date de livraison
//     }

//     return null;
//   }

//   submit(): void {
//     if (this.form.valid) {
//       const formData = new FormData();
//       const colis = {
//         description: this.form.value.description,
//         poids: this.form.value.poids,
//         adresseExpediteur: this.form.value.adresseExpediteur,
//         adresseDestinataire: this.form.value.adresseDestinataire,
//         dateExpedition: this.form.value.dateExpedition,
//         dateLivraisonPrevue: this.form.value.dateLivraisonPrevue,
//         clientId: this.form.value.clientId
//       };

//       formData.append('colis', JSON.stringify(colis));

//       if (this.isEditMode) {
//         this.colisService.updateColis(this.data!.id, formData).subscribe(
//           () => {
//             Swal.fire('Succès', 'Le colis a été mis à jour avec succès !', 'success');
//             this.dialogRef.close(true);
//           },
//           error => {
//             console.error('Erreur lors de la mise à jour du colis :', error);
//             Swal.fire('Erreur', 'Échec de la mise à jour du colis.', 'error');
//           }
//         );
//       } else {
//         this.colisService.createColis(formData).subscribe(
//           () => {
//             Swal.fire('Succès', 'Le colis a été créé avec succès !', 'success');
//             this.dialogRef.close(true);
//           },
//           error => {
//             console.error('Erreur lors de la création du colis :', error);
//             Swal.fire('Erreur', 'Échec de la création du colis.', 'error');
//           }
//         );
//       }
//     }
//   }

//   cancel(): void {
//     this.dialogRef.close();
//   }
// }
