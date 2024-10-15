  
  // src/app/Model/livraison.ts
export interface Livreur {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  licence: string;
}

export interface Colis {
  id: number;
  description: string;
  poids: number;
  adresseExpediteur: string;
  adresseDestinataire: string;
  dateExpedition: Date;
  dateLivraisonPrevue: Date;
  referenceSuivi: string;
  clientId: number; // Lien avec le client
  livraisonId?: number; // Lien avec la livraison si elle est déjà associée
  isAvailable: boolean; // Indicateur de disponibilité
}

// src/app/Model/itineraire.ts

export interface Itineraire {
  id: number; // Assuming this is the primary key
  departurePoint: string;
  arrivalPoint: string;
  waypoints: string[];
}

// Define the DTO for Itineraire, typically used when creating or updating Itineraire objects
export interface ItineraireDto {
  departurePoint: string;
  arrivalPoint: string;
  waypoints: string[];
}


export interface Livraison {
  id: number;
  dateLivraisonReelle: Date | null;
  statut: string;
  livreur: Livreur;
  colis: Colis;
  itineraire: Itineraire;
}
