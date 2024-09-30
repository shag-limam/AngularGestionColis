import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './../models/client/model'; // Assuming you have a Client model/interface

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseURL = "http://localhost:8006/users"; // Base URL for your API

  constructor(private httpClient: HttpClient) { }

  // Fetch the list of all clients
  getClientsList(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${this.baseURL}/listClient`);
  }

  // Register a new client
  createClient(client: Client, photo: File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('client', JSON.stringify(client));
    formData.append('photo', photo);

    return this.httpClient.post(`${this.baseURL}/signupClient`, formData);
  }



  // Fetch a client by their ID
  getClientById(id: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.baseURL}/getClient/${id}`);
  }

  // Update an existing client
  updateClient(id: number, client: Client, photo?: File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('client', JSON.stringify(client));
    if (photo) {
      formData.append('photo', photo);
    }

    return this.httpClient.put(`${this.baseURL}/updateClient/${id}`, formData);
  }

  // Delete a client by their ID
  deleteClient(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/deleteClient/${id}`);
  }
}
