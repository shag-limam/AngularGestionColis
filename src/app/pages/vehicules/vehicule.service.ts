// // vehicule.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Vehicule } from '../Model/vehicule';

// @Injectable({
//   providedIn: 'root'
// })
// export class VehiculeService {

//   private apiURL = "http://localhost:8006/api/vehicules";

//   constructor(private httpClient: HttpClient) {}

//   getAllVehicules(): Observable<Vehicule[]> {
//     return this.httpClient.get<Vehicule[]>(`${this.apiURL}/admin/list`);
//   }

//   approveVehicule(vehiculeId: number): Observable<Vehicule> {
//     return this.httpClient.put<Vehicule>(`${this.apiURL}/admin/approve/${vehiculeId}`, {});
//   }

//   rejectVehicule(vehiculeId: number, motif: string): Observable<Vehicule> {
//     return this.httpClient.put<Vehicule>(`${this.apiURL}/admin/reject/${vehiculeId}`, { motifDescription: motif });
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicule } from '../Model/vehicule';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {

  private apiURL = "http://localhost:8006/api/vehicules";

  constructor(private httpClient: HttpClient) {}

  // Récupérer tous les véhicules
  getAllVehicules(): Observable<Vehicule[]> {
    return this.httpClient.get<Vehicule[]>(`${this.apiURL}/admin/list`);
  }

  // Ajouter dans vehicule.service.ts
  getVehiculeById(id: number): Observable<Vehicule> {
    return this.httpClient.get<Vehicule>(`${this.apiURL}/${id}`);
  }

  // Approuver un véhicule
  approveVehicule(vehiculeId: number): Observable<Vehicule> {
    return this.httpClient.put<Vehicule>(`${this.apiURL}/admin/approve/${vehiculeId}`, {});
  }

  // Rejeter un véhicule avec un motif
  rejectVehicule(vehiculeId: number, motif: string): Observable<Vehicule> {
    return this.httpClient.put<Vehicule>(`${this.apiURL}/admin/reject/${vehiculeId}`, { motifDescription: motif });
  }
}
