import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importer Router pour la navigation programmée
import { LivreurService } from '../livreur.service';
import { Livreur } from '../../Model/livreur';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-livreur',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show-livreur.component.html',
  styleUrls: ['./show-livreur.component.css']
})
export class ShowLivreurComponent implements OnInit {
  livreurId!: number;
  livreur!: Livreur;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private livreurService: LivreurService,
    private location: Location,
    private router: Router // Injection du service Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('livreurId');
    if (id) {
      this.livreurId = +id;
      this.getLivreurDetails();
    } else {
      console.error('Erreur : Impossible de récupérer l\'ID du livreur depuis l\'URL.');
      this.isLoading = false;
    }
  }

  getLivreurDetails(): void {
    this.livreurService.getLivreurById(this.livreurId).subscribe(
      (data: Livreur) => {
        this.livreur = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du livreur :', error);
        this.isLoading = false;
      }
    );
  }

  // Méthode pour retourner à la page précédente
  goBack(): void {
    this.location.back();
  }

  // Méthode pour aller à la liste des livreurs
  goToList(): void {
    this.router.navigate(['/livreurs']);
  }
}
