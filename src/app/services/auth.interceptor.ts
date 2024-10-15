import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    // Exclure l'URL de login pour éviter d'ajouter le token
    if (req.url.includes('/auth/login')) {
      return next.handle(req);
    }
    
    // Si le token est présent, on l'ajoute à l'en-tête de la requête
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur HTTP interceptée:', error);
        
        if (error.status === 0) {
          console.error('Erreur réseau ou serveur injoignable.');
        }
        
        if (error.status === 401 || error.status === 403) {
          console.error('Token expiré ou non valide, redirection vers la page de connexion');
          this.router.navigate(['/login']);
        }
        
        return throwError(error);
      })
    );
  }
}
