import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivraisonService } from '../livraison.service';
import { Livraison } from '../../Model/livraison';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la livraison :', error);
        this.isLoading = false;
      }
    );
  }

  // Méthode pour retourner à la page précédente
  goBack(): void {
    this.location.back();
  }

  // Méthode pour aller à la liste des livraisons
  goToList(): void {
    this.router.navigate(['/livraisons']);
  }
}
