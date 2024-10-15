export interface LivraisonDto {
  id?: number;  // Optional for updates
  statut: string;
  colisId: number;
  livreurId: number;
  departurePoint: string;
  arrivalPoint: string;
  waypoints: string[];
  dateLivraisonPrevue?: string;
  dateExpedition?: string;
}
