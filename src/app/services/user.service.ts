import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators'; // Import tap operator
import { LoginResponse } from './LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public $refreshToken = new Subject<boolean>();
  public $refreshTokenReceived = new Subject<boolean>();

  private apiUrl = 'http://localhost:8006'; // Updated API URL

  constructor(private http: HttpClient) {
    this.$refreshToken.subscribe(() => {
      this.getRefreshToken();
    });
  }

  // Define the type for the response
  onLogin(obj: { email: string; password: string }) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, obj)
      .pipe(
        map((response: LoginResponse) => { 
          console.log("response ",response)
          // Explicitly type response
          // Store the token and user data in local storage
          localStorage.setItem('token', response.token);
          localStorage.setItem('expiresIn', JSON.stringify(response.expiresIn));
          localStorage.setItem('userType', response.userType);
          return response
        })
      );
  }

  // Updated refresh token method
  getRefreshToken() {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');
    const userType = localStorage.getItem('userType');
    
    if (token && expiresIn && userType) {
      
      const obj = {
        emailId: localStorage.getItem('angular17TokenEmail'), // Ensure this value is stored or provided
        token,
        refreshToken: token // Update this if you have a separate refresh token
      };
      console.log(obj)
      this.http.post(`${this.apiUrl}/refresh`, obj).subscribe((Res: any) => {
        localStorage.setItem('token', Res.data.token);
        localStorage.setItem('expiresIn', JSON.stringify(Res.data.expiresIn));
        localStorage.setItem('userType', Res.data.userType);
        this.$refreshTokenReceived.next(true);
      });
    }
  }

  // getUsers() {
  //   return this.http.get(`${this.apiUrl}/users/list`); // Ensure the endpoint is correct
  // }

  getClients() {
    return this.http.get(`${this.apiUrl}/users/listClient`); // Ensure the endpoint is correct
  }

  // Update a client by ID
  updateClient(clientId: number, updateData: any) {
    return this.http.put(`${this.apiUrl}/users/updateClient/${clientId}`, updateData);
  }

  // Delete a client by ID
  deleteClient(clientId: number) {
    return this.http.delete(`${this.apiUrl}/users/deleteClient/${clientId}`);
  }

  // Sign up a new client
  signupClient(signupData: any) {
    return this.http.post(`${this.apiUrl}/users/signupClient`, signupData);
  }
}
