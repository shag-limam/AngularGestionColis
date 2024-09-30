import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Client } from '../models/client/model'; // Adjust the import path as needed


@Injectable({
  providedIn: 'root',
})
export class ClientService {
  apiurl = 'http://localhost:8006'; // Updated to reflect Client API endpoint

 // Updated endpoint for clients
  
    constructor(private http: HttpClient) {}
  
    getAllClients(): Observable<ApiResponse<Client[]>> {
      return this.http.get<ApiResponse<Client[]>>(`${this.apiurl}/users/listClient`);
      
    }

    getClient(id: number): Observable<ApiResponse<Client>> {
      return this.http.get<ApiResponse<Client>>(`${this.apiurl}/users/${id}`);
    }
  
    createClient(client: Client, photo: File): Observable<ApiResponse<Client>> {
      const formData = new FormData();
      formData.append('client', JSON.stringify(client));
      formData.append('photo', photo);
  
      return this.http.post<ApiResponse<Client>>(`${this.apiurl}/users/signupClient`, formData);
    }
  
    updateClient(id: number, client: Client, photo?: File): Observable<ApiResponse<Client>> {
      const formData = new FormData();
      formData.append('client', JSON.stringify(client));
      if (photo) {
        formData.append('photo', photo);
      }
  
      return this.http.put<ApiResponse<Client>>(`${this.apiurl}/users/updateClient/${id}`, formData);
    }
  
    deleteClient(id: number): Observable<ApiResponse<any>> {
      return this.http.delete<ApiResponse<any>>(`${this.apiurl}/users/deleteClient/${id}`);
    }
  }