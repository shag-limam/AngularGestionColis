// src/app/models/colis.model.ts

export interface ImageData {
    id: number;
    name: string;
    type: string;
    imageData: string;
  }
    // Adapted to ApiResponse
    export interface ApiResponse<T> {
      message?: string;
      data: T;
    }
  export interface Colis {
    id: number;
    description: string;
    poids: number;
    adresseExpediteur: string;
    adresseDestinataire: string;
    dateExpedition: Date;
    dateLivraisonPrevue: Date;
    imageData?: ImageData;
    referenceSuivi: string;
    clientId: number; // Lien avec le client
    livraisonId?: number; // Lien avec la livraison si elle est déjà associée
  }
  