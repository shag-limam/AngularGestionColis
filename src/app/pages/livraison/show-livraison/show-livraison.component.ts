import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivraisonService } from '../livraison.service';
import { Livraison } from '../../Model/livraison';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-show-livraison',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show-livraison.component.html',
  styleUrls: ['./show-livraison.component.scss']
})
export class ShowLivraisonComponent implements OnInit {
  livraisonId!: number;
  livraison!: Livraison;
  isLoading: boolean = true;
  private map!: L.Map;

  constructor(
    private route: ActivatedRoute,
    private livraisonService: LivraisonService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('livraisonId');
    if (id) {
      this.livraisonId = +id;
      this.loadLivraison();
    } else {
      console.error('Erreur : Impossible de récupérer l\'ID de la livraison depuis l\'URL.');
      this.isLoading = false;
    }
  }

  async loadLivraison() {
    this.livraisonService.getLivraisonById(this.livraisonId).subscribe(
      (data: Livraison) => {
        this.livraison = data;
        this.isLoading = false;
        if (this.livraison?.itineraire) {
          setTimeout(() => this.initializeMap(), 100);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la livraison :', error);
        this.isLoading = false;
      }
    );
  }

  private initializeMap(): void {
    try {
      console.log('Full livraison data:', this.livraison);
      console.log('Itinerary data:', this.livraison?.itineraire);
      
      if (!this.livraison?.itineraire?.departurePoint || !this.livraison?.itineraire?.arrivalPoint) {
        console.error('Missing coordinates in itinerary. Structure:', {
          departurePoint: this.livraison?.itineraire?.departurePoint,
          arrivalPoint: this.livraison?.itineraire?.arrivalPoint
        });
        return;
      }

      // Parse coordinates based on the format received
      let departureLat: number, departureLng: number, arrivalLat: number, arrivalLng: number;

      const departurePoint = this.livraison.itineraire.departurePoint;
      const arrivalPoint = this.livraison.itineraire.arrivalPoint;

      if (typeof departurePoint === 'string' && typeof arrivalPoint === 'string') {
        // Handle string format "lat,lng"
        const [dLat, dLng] = (departurePoint as string).split(',').map(Number);
        const [aLat, aLng] = (arrivalPoint as string).split(',').map(Number);
        departureLat = dLat;
        departureLng = dLng;
        arrivalLat = aLat;
        arrivalLng = aLng;
      } else if (
        typeof departurePoint === 'object' && departurePoint !== null &&
        'latitude' in departurePoint && 'longitude' in departurePoint &&
        typeof arrivalPoint === 'object' && arrivalPoint !== null &&
        'latitude' in arrivalPoint && 'longitude' in arrivalPoint
      ) {
        // Handle object format {latitude: number, longitude: number}
        departureLat = Number(departurePoint.latitude);
        departureLng = Number(departurePoint.longitude);
        arrivalLat = Number(arrivalPoint.latitude);
        arrivalLng = Number(arrivalPoint.longitude);
      } else {
        console.error('Invalid coordinate format:', {
          departurePoint,
          arrivalPoint
        });
        return;
      }

      // Log parsed coordinates
      console.log('Parsed coordinates:', {
        departure: { lat: departureLat, lng: departureLng },
        arrival: { lat: arrivalLat, lng: arrivalLng }
      });

      // Validate coordinates
      if (isNaN(departureLat) || isNaN(departureLng) || 
          isNaN(arrivalLat) || isNaN(arrivalLng)) {
        console.error('Invalid coordinates after parsing:', {
          departure: { lat: departureLat, lng: departureLng },
          arrival: { lat: arrivalLat, lng: arrivalLng }
        });
        return;
      }

      // Validate coordinate ranges
      if (!this.isValidLatitude(departureLat) || !this.isValidLongitude(departureLng) ||
          !this.isValidLatitude(arrivalLat) || !this.isValidLongitude(arrivalLng)) {
        console.error('Coordinates out of valid range:', {
          departure: { lat: departureLat, lng: departureLng },
          arrival: { lat: arrivalLat, lng: arrivalLng }
        });
        return;
      }

      // Initialize map
      this.map = L.map('map').setView([departureLat, departureLng], 13);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Create custom markers
      const startIcon = L.divIcon({
        className: 'custom-marker start-marker',
        html: '<i class="fas fa-map-marker-alt"></i>',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      });

      const endIcon = L.divIcon({
        className: 'custom-marker end-marker',
        html: '<i class="fas fa-flag-checkered"></i>',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      });

      // Add markers with custom icons
      L.marker([departureLat, departureLng], { icon: startIcon })
        .addTo(this.map)
        .bindPopup('Point de départ');

      L.marker([arrivalLat, arrivalLng], { icon: endIcon })
        .addTo(this.map)
        .bindPopup('Point d\'arrivée');

      // Create a line between points
      const routeLine = L.polyline(
        [[departureLat, departureLng], [arrivalLat, arrivalLng]],
        {
          color: '#3498db',
          weight: 4,
          opacity: 0.8,
          dashArray: '10, 10'
        }
      ).addTo(this.map);

      // Fit map bounds to show all markers
      this.map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  private isValidLatitude(lat: number): boolean {
    return lat >= -90 && lat <= 90;
  }

  private isValidLongitude(lng: number): boolean {
    return lng >= -180 && lng <= 180;
  }

  goBack(): void {
    this.location.back();
  }

  goToList(): void {
    this.router.navigate(['/livraisons']);
  }
}
