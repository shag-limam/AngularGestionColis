
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, Subject } from 'rxjs';
// import { Client } from '../models/client/model';
// import { LoginResponse } from './LoginResponse';
// import { map } from 'rxjs/operators';


// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   public $refreshToken = new Subject<boolean>();
//   public $refreshTokenReceived = new Subject<boolean>();

//   private apiUrl = 'http://localhost:8006'; // Updated API URL

//   // constructor(private http: HttpClient) {}


//     constructor(private http: HttpClient) {
//     this.$refreshToken.subscribe(() => {
//       this.getRefreshToken();
//     });
//   }

//   // Define the type for the response
//   onLogin(obj: { email: string; password: string }): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, obj)
//       .pipe(
//         map((response: LoginResponse) => { 
//           console.log("response ", response);
//           // Store the token and user data in local storage
//           localStorage.setItem('token', response.token);
//           localStorage.setItem('expiresIn', JSON.stringify(response.expiresIn));
//           localStorage.setItem('userType', response.userType);
//           return response;
//         })
//       );
//   }

//   // Updated refresh token method
//   getRefreshToken(): void {
//     const token = localStorage.getItem('token');
//     const expiresIn = localStorage.getItem('expiresIn');
//     const userType = localStorage.getItem('userType');
    
//     if (token && expiresIn && userType) {
      
//       const obj = {
//         emailId: localStorage.getItem('angular17TokenEmail'),
//         token,
//         refreshToken: token
//       };
//       console.log(obj);
//       this.http.post(`${this.apiUrl}/refresh`, obj).subscribe((Res: any) => {
//         localStorage.setItem('token', Res.data.token);
//         localStorage.setItem('expiresIn', JSON.stringify(Res.data.expiresIn));
//         localStorage.setItem('userType', Res.data.userType);
//         this.$refreshTokenReceived.next(true);
//       });
//     }
//   }

//   // Get the list of clients
//   getClients(): Observable<Client[]> {
//     return this.http.get<Client[]>(`${this.apiUrl}/users/listClient`);
//   }

//   // Register a new client with photo
//   // signupClient(clientData: any, photo: File): Observable<Client> {
//   //   const formData = new FormData();
//   //   formData.append('client', JSON.stringify(clientData));
//   //   formData.append('photo', photo);

//   //   return this.http.post<Client>(`${this.apiUrl}/users/signupClient`, formData);
//   // }

//   signupClient(formData: FormData): Observable<Client> {
//     return this.http.post<Client>(`${this.apiUrl}/users/signupClient`, formData);
//   }
  
  

//   // signupClient(client: Client, photo: File | null): Observable<Client> {
//   //   const formData = new FormData();
//   //   formData.append('client', JSON.stringify(client)); // Convert client object to JSON
  
//   //   if (photo) {
//   //     formData.append('photo', photo); // Add photo if available
//   //   }
  
//   //   return this.http.post<Client>(`${this.apiUrl}/users/signupClient`, formData);
//   // }

  
  
  

//   // Update an existing client with optional photo
//   updateClient(clientId: number, clientData: any, photo?: File): Observable<Client> {
//     const formData = new FormData();
//     formData.append('client', JSON.stringify(clientData));
//     if (photo) {
//       formData.append('photo', photo);
//     }

//     return this.http.put<Client>(`${this.apiUrl}/users/updateClient/${clientId}`, formData);
//   }

//   // Delete a client by ID
//   deleteClient(clientId: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/users/deleteClient/${clientId}`);
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client/model'; // Assurez-vous que vous avez un modèle de client
import { LoginResponse } from './LoginResponse'; // Assurez-vous que LoginResponse est correctement défini

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public $refreshToken = new Subject<boolean>();
  public $refreshTokenReceived = new Subject<boolean>();

  private apiUrl = 'http://localhost:8006'; // Mettez à jour avec l'URL de votre API

  constructor(private http: HttpClient) {
    this.$refreshToken.subscribe(() => {
      this.getRefreshToken();
    });
  }

  // Connexion de l'utilisateur
  onLogin(obj: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, obj)
      .pipe(
        map((response: LoginResponse) => { 
          console.log("Réponse de la connexion:", response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('expiresIn', JSON.stringify(response.expiresIn));
          localStorage.setItem('userType', response.userType);
          return response;
        })
      );
  }

  // Rafraîchir le token
  getRefreshToken(): void {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');
    const userType = localStorage.getItem('userType');
    
    if (token && expiresIn && userType) {
      const obj = {
        emailId: localStorage.getItem('angular17TokenEmail'), // Assurez-vous que cette valeur est bien stockée
        token,
        refreshToken: token
      };
      console.log('Objet pour le rafraîchissement du token:', obj);
      this.http.post(`${this.apiUrl}/refresh`, obj).subscribe((Res: any) => {
        localStorage.setItem('token', Res.data.token);
        localStorage.setItem('expiresIn', JSON.stringify(Res.data.expiresIn));
        localStorage.setItem('userType', Res.data.userType);
        this.$refreshTokenReceived.next(true);
      });
    }
  }

  // Récupérer la liste des clients
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/users/listClient`);
  }

  // Inscrire un nouveau client avec une photo
  signupClient(formData: FormData): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/users/signupClient`, formData);
  }

  // Mettre à jour un client existant avec une photo
  updateClient(clientId: number, clientData: any, photo?: File): Observable<Client> {
    const formData = new FormData();
    formData.append('client', JSON.stringify(clientData));
    if (photo) {
      formData.append('photo', photo);
    }
    return this.http.put<Client>(`${this.apiUrl}/users/updateClient/${clientId}`, formData);
  }

  // Supprimer un client
  deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/deleteClient/${clientId}`);
  }
}
