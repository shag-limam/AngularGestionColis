import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Livreur } from '../Model/livreur';


@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  
  private apiURL = "http://localhost:8006/api/users"; // Base API URL

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  // Création d'un livreur
  createLivreur(livreurData: FormData): Observable<Livreur> {
    return this.httpClient.post<Livreur>(`${this.apiURL}/signupLivreur`, livreurData)
      .pipe(catchError(this.errorHandler));
  }

  // Récupérer tous les livreurs
  getAllLivreurs(): Observable<Livreur[]> {
    return this.httpClient.get<Livreur[]>(`${this.apiURL}/listLivreur`)
      .pipe(catchError(this.errorHandler));
  }

  // Récupérer un livreur par ID
  getLivreurById(livreurId: number): Observable<Livreur> {
    return this.httpClient.get<Livreur>(`${this.apiURL}/listL/${livreurId}`)
      .pipe(catchError(this.errorHandler));//listL
  }

  // Mise à jour d'un livreur
  updateLivreur(livreurId: number, formData: FormData): Observable<Livreur> {
    return this.httpClient.put<Livreur>(`${this.apiURL}/updateLivreur/${livreurId}`, formData)
      .pipe(catchError(this.errorHandler));
  }

  // Mise à jour du statut du livreur
  updateLivreurStatus(livreurId: number, active: boolean): Observable<Livreur> {
    return this.httpClient.put<Livreur>(`${this.apiURL}/updateLivreurStatus/${livreurId}`, { active }, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  // Supprimer un livreur par ID
  deleteLivreur(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}/deleteLivreur/${id}`, { responseType: 'text' })
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
