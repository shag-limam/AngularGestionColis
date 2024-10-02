import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';  // Import pour les formulaires réactifs
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../Client.Service';
import { Client } from '../../Model/client';
import { CommonModule } from '@angular/common';  // Importer CommonModule pour *ngIf
import { RouterModule } from '@angular/router';  // Importer RouterModule pour routerLink
import {OnInit } from '@angular/core';



@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  form: FormGroup;
  clientId!: number;
  client!: Client;  // Store the client data
  selectedFile: File | null = null;  // Initialize the selected file as null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {
    // Initialize the form group
    this.form = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      password: new FormControl(null),  // Optional password field
      photo: new FormControl(null)  // Optional photo field for file input
    });
  }

  ngOnInit(): void {
    // Get the client ID from the route parameters
    this.clientId = +this.route.snapshot.paramMap.get('clientId')!;

    // Fetch client data based on the client ID and patch the form with the data
    this.clientService.getClientById(this.clientId).subscribe(
      (client: Client) => {
        this.client = client;  // Store the fetched client data
        this.form.patchValue({
          fullName: client.fullName,
          email: client.email,
          address: client.address,
          phoneNumber: client.phoneNumber
          // Do not set password or photo here, password is optional and photo is handled separately
        });
      },
      (error) => {
        console.error('Error loading client data:', error);
      }
    );
  }

  // Handle the file change event and set the selected file
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    } else {
      this.selectedFile = null;  // Reset file if no file is selected
    }
  }

  // Handle the form submission and send the updated data along with the selected file
  submit(): void {
    if (this.form.valid) {
      const updatedClient: Client = {
        ...this.client,  // Merge existing client data
        ...this.form.value  // Merge updated form values
      };

      const formData = new FormData();
      formData.append('client', JSON.stringify(updatedClient));  // Append the updated client as JSON

      // If a file was selected, append the file to FormData
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile);
      }

      // Send the PUT request to update the client
      this.clientService.updateClient(this.clientId, formData).subscribe(
        () => {
          // Navigate to the client list page on successful update
          this.router.navigate(['/clients']);
        },
        (error: any) => {
          // Handle error response from the API
          console.error('Error updating client:', error);
        }
      );
    }
  }
}
