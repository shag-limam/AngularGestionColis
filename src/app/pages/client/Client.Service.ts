import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '../Model/client'; // Assurez-vous d'avoir le modèle Client

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiURL = "http://localhost:8006/api/users"; // Votre base API URL

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  // Méthode pour créer un client avec image
  createClient(clientData: FormData): Observable<Client> {
    return this.httpClient.post<Client>(`${this.apiURL}/signupClient`, clientData)
      .pipe(catchError(this.errorHandler));  // Gestion des erreurs
  }

 

  // Récupérer la liste de tous les clients
  getAllClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${this.apiURL}/listClient`)
      .pipe(catchError(this.errorHandler));
  }

  // Méthode pour récupérer un client par ID
  getClientById(clientId: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.apiURL}/listC/${clientId}`)
      .pipe(catchError(this.errorHandler));
  }
  
  // Méthode pour mettre à jour un client
  updateClient(clientId: number, formData: FormData): Observable<Client> {
    return this.httpClient.put<Client>(`${this.apiURL}/updateClient/${clientId}`, formData)
      .pipe(catchError(this.errorHandler));
  }
  
  updateClientStatus(clientId: number, active: boolean): Observable<Client> {
    return this.httpClient.put<Client>(`${this.apiURL}/updateClientStatus/${clientId}`, { active })
      .pipe(catchError(this.errorHandler));
  }
  
  
  

  // Supprimer un client par son ID
  deleteClient(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}/deleteClient/${id}`, { responseType: 'text' })
      .pipe(catchError(this.errorHandler));
  }

  // Gestion des erreurs HTTP
  errorHandler(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur : ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
