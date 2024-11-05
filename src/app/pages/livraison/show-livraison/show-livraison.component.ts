// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { LivraisonService } from '../livraison.service';
// import { Livraison } from '../../Model/livraison';
// import { Location } from '@angular/common';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-show-livraison',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './show-livraison.component.html',
//   styleUrls: ['./show-livraison.component.scss']
// })
// export class ShowLivraisonComponent implements OnInit {
//   livraisonId!: number;
//   livraison!: Livraison;
//   isLoading: boolean = true;

//   constructor(
//     private route: ActivatedRoute,
//     private livraisonService: LivraisonService,
//     private location: Location,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('livraisonId');
//     if (id) {
//       this.livraisonId = +id;
//       this.getLivraisonDetails();
//     } else {
//       console.error('Erreur : Impossible de récupérer l\'ID de la livraison depuis l\'URL.');
//       this.isLoading = false;
//     }
//   }

//   getLivraisonDetails(): void {
//     this.livraisonService.getLivraisonById(this.livraisonId).subscribe(
//       (data: Livraison) => {
//         this.livraison = data;
//         this.isLoading = false;
//       },
//       (error) => {
//         console.error('Erreur lors de la récupération des détails de la livraison :', error);
//         this.isLoading = false;
//       }
//     );
//   }

//   // Méthode pour retourner à la page précédente
//   goBack(): void {
//     this.location.back();
//   }

//   // Méthode pour aller à la liste des livraisons
//   goToList(): void {
//     this.router.navigate(['/livraisons']);
//   }
// }
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

  private map: any;

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
      this.getLivraisonDetails();
    } else {
      console.error('Erreur : Impossible de récupérer l\'ID de la livraison depuis l\'URL.');
      this.isLoading = false;
    }
  }

  getLivraisonDetails(): void {
    this.livraisonService.getLivraisonById(this.livraisonId).subscribe(
      (data: Livraison) => {
        this.livraison = data;
        this.isLoading = false;
        this.initMap();
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la livraison :', error);
        this.isLoading = false;
      }
    );
  }

  initMap(): void {
    if (this.livraison?.itineraire) {
      const departure = this.livraison.itineraire.departurePoint;
      const arrival = this.livraison.itineraire.arrivalPoint;

      this.map = L.map('map').setView([departure.latitude, departure.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // Ajouter un marqueur pour le point de départ
      L.marker([departure.latitude, departure.longitude])
        .addTo(this.map)
        .bindPopup('Point de Départ')
        .openPopup();

      // Ajouter un marqueur pour le point d'arrivée
      L.marker([arrival.latitude, arrival.longitude])
        .addTo(this.map)
        .bindPopup('Point d\'Arrivée');
    }
  }

  goBack(): void {
    this.location.back();
  }

  goToList(): void {
    this.router.navigate(['/livraisons']);
  }
}
