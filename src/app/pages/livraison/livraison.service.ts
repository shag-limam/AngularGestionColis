// livraison.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivraisonDto } from '../Model/livraison.dto';  // DTO de livraison
import { Livraison } from '../Model/livraison';
import { Colis } from '../Model/colis';  // Modèle pour Colis
import { Livreur } from '../Model/livreur';  // Modèle pour Livreur

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  private baseUrl = 'http://localhost:8006/api/livraisons';  // Base URL de l'API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les livraisons
  getAllLivraisons(): Observable<Livraison[]> {
    return this.http.get<Livraison[]>(`${this.baseUrl}/list`);
  }

  // Récupérer une livraison par son ID
  getLivraisonById(id: number): Observable<Livraison> {
    return this.http.get<Livraison>(`${this.baseUrl}/${id}`);
  }

  // Créer une nouvelle livraison en utilisant LivraisonDto
  createLivraison(livraisonDto: LivraisonDto): Observable<Livraison> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Livraison>(`${this.baseUrl}/create`, livraisonDto, { headers });
  }

  // Mettre à jour une livraison existante en utilisant LivraisonDto
  updateLivraison(id: number, livraisonDto: LivraisonDto): Observable<Livraison> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<Livraison>(`${this.baseUrl}/update/${id}`, livraisonDto, { headers });
  }

  // Mettre à jour le statut d'une livraison
  updateLivraisonStatus(id: number, statut: string): Observable<Livraison> {
    return this.http.put<Livraison>(`${this.baseUrl}/updateStatus/${id}`, null, {
      params: { statut }
    });
  }

  // Supprimer une livraison par son ID
  // deleteLivraison(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  // }
  deleteLivraison(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
  

  // Récupérer les livreurs disponibles
  getAvailableLivreurs(): Observable<Livreur[]> {
    return this.http.get<Livreur[]>(`${this.baseUrl}/availableLivreurs`);
  }

  // Récupérer les colis disponibles (non affectés à une livraison)
  getAvailableColis(): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${this.baseUrl}/availableColis`);
  }
}
