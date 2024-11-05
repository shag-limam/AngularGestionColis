export interface Vehicule {
  id: number;
  marque: string;
  modele: string;
  immatriculation: string;
  approuve: boolean;
  rejected: boolean;
  livreur?: Livreur;
  geolocalisation?: Geolocalisation;
  motif?: Motif;
  assurance?: ImageData;
  carteGrise?: ImageData;
  photos?: ImageData[];
}

// Autres interfaces
export interface ImageData {
  id: number;
  name: string;
  type: string;
  imageData: string; // Encodée en base64 pour être affichée comme image
}

export interface Livreur {
  id: number;
  fullName: string;
  email: string;
  licence: string;
  phoneNumber: string;
  address: string;
  active: boolean;
}

export interface Geolocalisation {
  id: number;
  latitude: number;
  longitude: number;
}

export interface Motif {
  id: number;
  motifDescription: string;
}
