import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../Client.Service';  // Import ClientService

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {

  form!: FormGroup;
  selectedFile!: File | null;
  imagePreview: string | ArrayBuffer | null = null;  // Variable pour stocker la prévisualisation de l'image
  message: string = '';  // Message de confirmation ou d'erreur

  constructor(
    public clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }

  // Méthode pour gérer la sélection d'un fichier et générer la prévisualisation
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Générer une prévisualisation de l'image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;  // Stocke la prévisualisation en base64
      };
      reader.readAsDataURL(file);  // Lire l'image comme URL data
    }
  }

  // Méthode pour soumettre le formulaire avec les données du client et l'image
  submit(): void {
    const clientData = new FormData();

    const client = {
      fullName: this.form.value.fullName,
      email: this.form.value.email,
      address: this.form.value.address,
      phoneNumber: this.form.value.phoneNumber,
      password: this.form.value.password
    };
    clientData.append('client', JSON.stringify(client));

    if (this.selectedFile) {
      clientData.append('photo', this.selectedFile);
    }

    // Appel à l'API pour créer un client
    this.clientService.createClient(clientData).subscribe(
      (res: any) => {
        this.message = 'Client créé avec succès !';
        this.router.navigateByUrl('clients');
      },
      (error) => {
        this.message = 'Erreur lors de la création du client. Veuillez réessayer.';
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/clients']); // Rediriger vers la liste des clients
  }
  
}
