import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule], // Use RouterModule for routing
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  loginObj = {
    email: '',
    password: ''
  };
  isLoading = false;
  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];

  constructor(private userSrv: UserService, private router: Router) {}

  // login() {
  //   if (!this.loginObj.email || !this.loginObj.password) {
  //     // Basic validation
  //     return;
  //   }

  //   this.isLoading = true;
  //   this.userSrv.onLogin(this.loginObj).subscribe(response => {
  //     console.log("response", response);
  //     localStorage.setItem('expiresIn', JSON.stringify(response.expiresIn));
  //     localStorage.setItem('userType', response.userType);
  //     this.router.navigateByUrl('/dashboard/default');
  //     this.isLoading = false;
  //   }, error => {
  //     console.error('Login failed', error);
  //     this.isLoading = false;
  //   });
  // }

  login() {
    if (!this.loginObj.email || !this.loginObj.password) {
      // Validation basique
      Swal.fire({
        title: 'Champs manquants',
        text: 'Veuillez entrer votre email et mot de passe.',
        icon: 'warning',
        timer: 1250, // Disparaît après 2,5 secondes
        showConfirmButton: false
      });
      return;
    }
  
    this.isLoading = true;
    this.userSrv.onLogin(this.loginObj).subscribe(
      (response) => {
        console.log("response", response);
        localStorage.setItem('expiresIn', JSON.stringify(response.expiresIn));
        localStorage.setItem('userType', response.userType);
        this.router.navigateByUrl('/dashboard/default');
  
        // Alerte de succès
        Swal.fire({
          title: 'Connexion réussie',
          text: 'Vous êtes maintenant connecté.',
          icon: 'success',
          timer: 1250, // Disparaît après 2,5 secondes
          showConfirmButton: false
        });
  
        this.isLoading = false;
      },
      (error) => {
        console.error('Login failed', error);
  
        // Alerte d'échec
        Swal.fire({
          title: 'Erreur de connexion',
          text: 'Veuillez vérifier vos informations de connexion.',
          icon: 'error',
          timer: 1250, // Disparaît après 2.5 secondes
          showConfirmButton: false
        });
  
        this.isLoading = false;
      }
    );
  }  
}