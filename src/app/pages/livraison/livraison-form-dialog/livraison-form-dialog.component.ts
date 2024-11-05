// import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
// import { LivraisonService } from '../livraison.service';
// import { LivraisonDto } from '../../Model/livraison.dto';
// import { CommonModule } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import Swal from 'sweetalert2';
// import { MapPickerDialogComponent } from '../map-picker-dialog/map-picker-dialog.component';

// @Component({
//   selector: 'app-livraison-form-dialog',
//   standalone: true,
//   templateUrl: './livraison-form-dialog.component.html',
//   styleUrls: ['./livraison-form-dialog.component.scss'],
//   imports: [
//     CommonModule,
//     MatButtonModule,
//     MatIconModule,
//     ReactiveFormsModule
//   ],
// })
// export class LivraisonFormDialogComponent implements OnInit, AfterViewInit {
//   form: FormGroup;
//   livreurs: any[] = [];
//   colisDisponibles: any[] = [];
//   isEditMode = false;

//   constructor(
//     private fb: FormBuilder,
//     private livraisonService: LivraisonService,
//     public dialogRef: MatDialogRef<LivraisonFormDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: LivraisonDto,
//     private dialog: MatDialog
//   ) {
//     this.isEditMode = !!data;

//     // Initialisation du formulaire
//     this.form = this.fb.group({
//       livreurId: [data?.livreurId || '', [Validators.required]],
//       colisId: [data?.colisId || '', [Validators.required]],
//       departurePoint: [data?.departurePoint || '', [Validators.required]],
//       arrivalPoint: [data?.arrivalPoint || '', [Validators.required]],
//       waypoints: [data?.waypoints?.join(', ') || ''],
//       statut: [data?.statut || 'En attente', [Validators.required]],
//       dateExpedition: [data?.dateExpedition || ''],
//       dateLivraisonPrevue: [data?.dateLivraisonPrevue || '']
//     });
//   }

//   ngOnInit(): void {
//     if (this.isEditMode) {
//       this.livraisonService.getLivraisonById(this.data.id!).subscribe(
//         (livraison) => {
//           const livraisonDto: LivraisonDto = this.convertToLivraisonDto(livraison);
//           this.form.patchValue({
//             livreurId: livraisonDto.livreurId,
//             colisId: livraisonDto.colisId,
//             departurePoint: livraisonDto.departurePoint,
//             arrivalPoint: livraisonDto.arrivalPoint,
//             waypoints: livraisonDto.waypoints.join(', '),
//             statut: livraisonDto.statut,
//             dateExpedition: livraisonDto.dateExpedition,
//             dateLivraisonPrevue: livraisonDto.dateLivraisonPrevue
//           });

//           this.loadAvailableLivreurs(livraison.livreur);
//           this.loadAvailableColis(livraison.colis);
//         },
//         (error) => console.error('Erreur lors de la récupération de la livraison :', error)
//       );
//     } else {
//       this.loadAvailableLivreurs();
//       this.loadAvailableColis();
//     }
//   }

//   ngAfterViewInit(): void {
//     // Peut-être ajouter de l'initialisation si nécessaire
//   }

//   openMap(type: 'departure' | 'arrival', event: MouseEvent): void {
//     event.stopPropagation(); // Empêcher la propagation de l'événement de clic
  
//     // Si vous êtes en mode modification (update), demander une confirmation
//     if (this.isEditMode && window.confirm('Êtes-vous sûr de vouloir changer ce point ?')) {
//       if (type === 'departure') {
//         this.form.patchValue({ departurePoint: '' });
//       } else if (type === 'arrival') {
//         this.form.patchValue({ arrivalPoint: '' });
//       }
//     }
  
//     // Ouvrir le dialogue pour sélectionner un nouveau point sur la carte
//     const dialogRef = this.dialog.open(MapPickerDialogComponent, {
//       data: {
//         pointType: type, // Passer 'pointType' pour différencier les points
//         defaultPoint: this.form.get(type === 'departure' ? 'departurePoint' : 'arrivalPoint')?.value // Passer la valeur actuelle du point
//       }
//     });
  
//     // Mettre à jour le formulaire une fois la sélection terminée
//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) {
//         if (type === 'departure') {
//           this.form.patchValue({ departurePoint: result });
//         } else if (type === 'arrival') {
//           this.form.patchValue({ arrivalPoint: result });
//         }
//       }
//     });
//   }
    
//   convertToLivraisonDto(livraison: any): LivraisonDto {
//     return {
//       id: livraison.id,
//       statut: livraison.statut,
//       colisId: livraison.colis?.id || null,
//       livreurId: livraison.livreur?.id || null,
//       departurePoint: livraison.itineraire?.departurePoint || '',
//       arrivalPoint: livraison.itineraire?.arrivalPoint || '',
//       waypoints: livraison.itineraire?.waypoints || [],
//       dateExpedition: livraison.colis?.dateExpedition || '',
//       dateLivraisonPrevue: livraison.colis?.dateLivraisonPrevue || ''
//     };
//   }

//   loadAvailableLivreurs(currentLivreur?: any): void {
//     this.livraisonService.getAvailableLivreurs().subscribe(
//       (data) => {
//         if (currentLivreur) {
//           this.livreurs = [currentLivreur, ...data.filter((l: any) => l.id !== currentLivreur.id)];
//         } else {
//           this.livreurs = data;
//         }
//       },
//       (error) => console.error('Erreur lors de la récupération des livreurs disponibles :', error)
//     );
//   }

//   loadAvailableColis(currentColis?: any): void {
//     this.livraisonService.getAvailableColis().subscribe(
//       (data) => {
//         if (currentColis) {
//           this.colisDisponibles = [currentColis, ...data.filter((c: any) => c.id !== currentColis.id)];
//         } else {
//           this.colisDisponibles = data;
//         }
//       },
//       (error) => console.error('Erreur lors de la récupération des colis disponibles :', error)
//     );
//   }

//   submit(): void {
//     if (this.form.valid) {
//       const livraisonData: Partial<LivraisonDto> = {
//         statut: this.form.value.statut,
//         colisId: this.form.value.colisId,
//         livreurId: this.form.value.livreurId,
//         departurePoint: this.form.value.departurePoint,
//         arrivalPoint: this.form.value.arrivalPoint,
//         waypoints: this.form.value.waypoints?.split(',').map((w: string) => w.trim()),
//         dateExpedition: this.form.value.dateExpedition,
//         dateLivraisonPrevue: this.form.value.dateLivraisonPrevue
//       };
  
//       if (this.isEditMode) {
//         this.livraisonService.updateLivraison(this.data.id!, livraisonData as LivraisonDto).subscribe(
//           () => {
//             this.dialogRef.close(true); // Fermer le dialogue
//             Swal.fire({
//               title: 'Mise à jour réussie!',
//               text: 'La livraison a été mise à jour avec succès.',
//               icon: 'success',
//               timer: 1250, // Disparaît après 5 secondes
//               showConfirmButton: false
//             });
//           },
//           (error) => {
//             console.error('Erreur lors de la mise à jour de la livraison :', error);
//             Swal.fire({
//               title: 'Erreur!',
//               text: 'Une erreur est survenue lors de la mise à jour de la livraison.',
//               icon: 'error',
//               timer: 5000, // Disparaît après 5 secondes
//               showConfirmButton: false
//             });
//           }
//         );
//       } else {
//         this.livraisonService.createLivraison(livraisonData as LivraisonDto).subscribe(
//           () => {
//             this.dialogRef.close(true); // Fermer le dialogue
//             Swal.fire({
//               title: 'Création réussie!',
//               text: 'La livraison a été créée avec succès.',
//               icon: 'success',
//               timer: 1250, // Disparaît après 5 secondes
//               showConfirmButton: false
//             });
//           },
//           (error) => {
//             console.error('Erreur lors de la création de la livraison :', error);
//             Swal.fire({
//               title: 'Erreur!',
//               text: 'Une erreur est survenue lors de la création de la livraison.',
//               icon: 'error',
//               timer: 5000, // Disparaît après 5 secondes
//               showConfirmButton: false
//             });
//           }
//         );
//       }
//     }
//   }
  
//   // submit(): void {
//   //   if (this.form.valid) {
//   //     const livraisonData: Partial<LivraisonDto> = {
//   //       statut: this.form.value.statut,
//   //       colisId: this.form.value.colisId,
//   //       livreurId: this.form.value.livreurId,
//   //       departurePoint: this.form.value.departurePoint,
//   //       arrivalPoint: this.form.value.arrivalPoint,
//   //       waypoints: this.form.value.waypoints?.split(',').map((w: string) => w.trim()),
//   //       dateExpedition: this.form.value.dateExpedition,
//   //       dateLivraisonPrevue: this.form.value.dateLivraisonPrevue
//   //     };

//   //     if (this.isEditMode) {
//   //       this.livraisonService.updateLivraison(this.data.id!, livraisonData as LivraisonDto).subscribe(
//   //         () => this.dialogRef.close(true),
//   //         (error) => console.error('Erreur lors de la mise à jour de la livraison :', error)
//   //       );
//   //     } else {
//   //       this.livraisonService.createLivraison(livraisonData as LivraisonDto).subscribe(
//   //         () => this.dialogRef.close(true),
//   //         (error) => console.error('Erreur lors de la création de la livraison :', error)
//   //       );
//   //     }
//   //   }
//   // }

//   cancel(): void {
//     this.dialogRef.close();
//   }
// }
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LivraisonService } from '../livraison.service';
import { LivraisonDto } from '../../Model/livraison.dto';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { MapPickerDialogComponent } from '../map-picker-dialog/map-picker-dialog.component';

@Component({
  selector: 'app-livraison-form-dialog',
  standalone: true,
  templateUrl: './livraison-form-dialog.component.html',
  styleUrls: ['./livraison-form-dialog.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
})
export class LivraisonFormDialogComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  livreurs: any[] = [];
  colisDisponibles: any[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private livraisonService: LivraisonService,
    public dialogRef: MatDialogRef<LivraisonFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LivraisonDto,
    private dialog: MatDialog
  ) {
    this.isEditMode = !!data;

    // Initialisation du formulaire
    this.form = this.fb.group({
      livreurId: [data?.livreurId || '', [Validators.required]],
      colisId: [data?.colisId || '', [Validators.required]],
      departurePoint: [data?.departurePoint || '', [Validators.required]],
      arrivalPoint: [data?.arrivalPoint || '', [Validators.required]],
      waypoints: [data?.waypoints?.join(', ') || ''],
      statut: [data?.statut || 'En attente', [Validators.required]],
      dateExpedition: [data?.dateExpedition || ''],
      dateLivraisonPrevue: [data?.dateLivraisonPrevue || '']
    });
  }

  ngOnInit(): void {
    if (this.isEditMode) {
      this.livraisonService.getLivraisonById(this.data.id!).subscribe(
        (livraison) => {
          const livraisonDto: LivraisonDto = this.convertToLivraisonDto(livraison);
          this.form.patchValue({
            livreurId: livraisonDto.livreurId,
            colisId: livraisonDto.colisId,
            departurePoint: livraisonDto.departurePoint,
            arrivalPoint: livraisonDto.arrivalPoint,
            waypoints: livraisonDto.waypoints.join(', '),
            statut: livraisonDto.statut,
            dateExpedition: livraisonDto.dateExpedition,
            dateLivraisonPrevue: livraisonDto.dateLivraisonPrevue
          });

          this.loadAvailableLivreurs(livraison.livreur);
          this.loadAvailableColis(livraison.colis);
        },
        (error) => console.error('Erreur lors de la récupération de la livraison :', error)
      );
    } else {
      this.loadAvailableLivreurs();
      this.loadAvailableColis();
    }
  }

  
  ngAfterViewInit(): void {}

  openMap(type: 'departure' | 'arrival', event: MouseEvent): void {
    event.stopPropagation();

    if (this.isEditMode && window.confirm('Êtes-vous sûr de vouloir changer ce point ?')) {
      if (type === 'departure') {
        this.form.patchValue({ departurePoint: '' });
      } else if (type === 'arrival') {
        this.form.patchValue({ arrivalPoint: '' });
      }
    }

    const dialogRef = this.dialog.open(MapPickerDialogComponent, {
      data: {
        pointType: type,
        defaultPoint: this.form.get(type === 'departure' ? 'departurePoint' : 'arrivalPoint')?.value
      },
      disableClose: false // Ferme le dialogue au clic à l'extérieur
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (type === 'departure') {
          this.form.patchValue({ departurePoint: result });
        } else if (type === 'arrival') {
          this.form.patchValue({ arrivalPoint: result });
        }
      }
    });
  }

  

  convertToLivraisonDto(livraison: any): LivraisonDto {
    return {
      id: livraison.id,
      statut: livraison.statut,
      colisId: livraison.colis?.id || null,
      livreurId: livraison.livreur?.id || null,
      departurePoint: livraison.itineraire?.departurePoint || '',
      arrivalPoint: livraison.itineraire?.arrivalPoint || '',
      waypoints: livraison.itineraire?.waypoints || [],
      dateExpedition: livraison.colis?.dateExpedition || '',
      dateLivraisonPrevue: livraison.colis?.dateLivraisonPrevue || ''
    };
  }

  loadAvailableLivreurs(currentLivreur?: any): void {
    this.livraisonService.getAvailableLivreurs().subscribe(
      (data) => {
        if (currentLivreur) {
          this.livreurs = [currentLivreur, ...data.filter((l: any) => l.id !== currentLivreur.id)];
        } else {
          this.livreurs = data;
        }
      },
      (error) => console.error('Erreur lors de la récupération des livreurs disponibles :', error)
    );
  }

  loadAvailableColis(currentColis?: any): void {
    this.livraisonService.getAvailableColis().subscribe(
      (data) => {
        if (currentColis) {
          this.colisDisponibles = [currentColis, ...data.filter((c: any) => c.id !== currentColis.id)];
        } else {
          this.colisDisponibles = data;
        }
      },
      (error) => console.error('Erreur lors de la récupération des colis disponibles :', error)
    );
  }

  submit(): void {
    if (this.form.valid) {
      const livraisonData: Partial<LivraisonDto> = {
        statut: this.form.value.statut,
        colisId: this.form.value.colisId,
        livreurId: this.form.value.livreurId,
        departurePoint: this.form.value.departurePoint,
        arrivalPoint: this.form.value.arrivalPoint,
        waypoints: this.form.value.waypoints?.split(',').map((w: string) => w.trim()),
        dateExpedition: this.form.value.dateExpedition,
        dateLivraisonPrevue: this.form.value.dateLivraisonPrevue
      };

      if (this.isEditMode) {
        this.livraisonService.updateLivraison(this.data.id!, livraisonData as LivraisonDto).subscribe(
          () => {
            this.dialogRef.close(true);
            Swal.fire({
              title: 'Mise à jour réussie!',
              text: 'La livraison a été mise à jour avec succès.',
              icon: 'success',
              timer: 1250,
              showConfirmButton: false
            });
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la livraison :', error);
            Swal.fire({
              title: 'Erreur!',
              text: 'Une erreur est survenue lors de la mise à jour de la livraison.',
              icon: 'error',
              timer: 5000,
              showConfirmButton: false
            });
          }
        );
      } else {
        this.livraisonService.createLivraison(livraisonData as LivraisonDto).subscribe(
          () => {
            this.dialogRef.close(true);
            Swal.fire({
              title: 'Création réussie!',
              text: 'La livraison a été créée avec succès.',
              icon: 'success',
              timer: 1250,
              showConfirmButton: false
            });
          },
          (error) => {
            console.error('Erreur lors de la création de la livraison :', error);
            Swal.fire({
              title: 'Erreur!',
              text: 'Une erreur est survenue lors de la création de la livraison.',
              icon: 'error',
              timer: 5000,
              showConfirmButton: false
            });
          }
        );
      }
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
