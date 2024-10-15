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
