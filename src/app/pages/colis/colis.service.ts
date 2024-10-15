// // src/app/services/colis.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Colis } from '../Model/colis';

// @Injectable({
//   providedIn: 'root'
// })
// export class ColisService {
  
//   private apiURL = "http://localhost:8006/api/colis"; // Base API URL

//   httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json'
//     })
//   };

//   constructor(private httpClient: HttpClient) {}

//   // Créer un colis
//   createColis(colisData: FormData): Observable<Colis> {
//     return this.httpClient.post<Colis>(`${this.apiURL}/createColis`, colisData)
//       .pipe(catchError(this.errorHandler));
//   }

//   // Récupérer tous les colis
//   getAllColis(): Observable<Colis[]> {
//     return this.httpClient.get<Colis[]>(`${this.apiURL}/list`)
//       .pipe(catchError(this.errorHandler));
//   }

//   // Récupérer un colis par ID
//   getColisById(colisId: number): Observable<Colis> {
//     return this.httpClient.get<Colis>(`${this.apiURL}/${colisId}`)
//       .pipe(catchError(this.errorHandler));
//   }

//   // Mettre à jour un colis existant
//   updateColis(colisId: number, colisData: FormData): Observable<Colis> {
//     return this.httpClient.put<Colis>(`${this.apiURL}/updateColis/${colisId}`, colisData)
//       .pipe(catchError(this.errorHandler));
//   }

//   // Supprimer un colis par ID
//   deleteColis(id: number): Observable<any> {
//     return this.httpClient.delete(`${this.apiURL}/deleteColis/${id}`, { responseType: 'text' })
//       .pipe(catchError(this.errorHandler));
//   }

//   // Gestion des erreurs HTTP
//   errorHandler(error: any): Observable<never> {
//     let errorMessage = '';
//     if (error.error instanceof ErrorEvent) {
//       errorMessage = `Erreur : ${error.error.message}`;
//     } else {
//       errorMessage = `Code d'erreur : ${error.status}\nMessage: ${error.message}`;
//     }
//     return throwError(errorMessage);
//   }
// }


// src/app/services/colis.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Colis } from '../Model/colis';

@Injectable({
  providedIn: 'root'
})
export class ColisService {
  
  private apiURL = "http://localhost:8006/api/colis"; // Base API URL

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  // Créer un colis
  createColis(colisData: FormData): Observable<Colis> {
    return this.httpClient.post<Colis>(`${this.apiURL}/createColis`, colisData)
      .pipe(catchError(this.errorHandler));
  }

  // Récupérer tous les colis
  getAllColis(): Observable<Colis[]> {
    return this.httpClient.get<Colis[]>(`${this.apiURL}/list`)
      .pipe(catchError(this.errorHandler));
  }

  // Récupérer un colis par ID
  getColisById(colisId: number): Observable<Colis> {
    return this.httpClient.get<Colis>(`${this.apiURL}/${colisId}`)
      .pipe(catchError(this.errorHandler));
  }

  // Récupérer les colis disponibles (ceux qui n'ont pas encore été affectés à une livraison)
  getColisDisponibles(): Observable<Colis[]> {
    return this.httpClient.get<Colis[]>(`${this.apiURL}/disponibles`)
      .pipe(catchError(this.errorHandler));
  }

  // Mettre à jour un colis existant
  updateColis(colisId: number, colisData: FormData): Observable<Colis> {
    return this.httpClient.put<Colis>(`${this.apiURL}/updateColis/${colisId}`, colisData)
      .pipe(catchError(this.errorHandler));
  }

  // Supprimer un colis par ID
  deleteColis(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}/deleteColis/${id}`, { responseType: 'text' })
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
