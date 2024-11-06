import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8006/api/notifications';

  constructor(private http: HttpClient) {}

  getNotificationsForAdmin(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin`);
  }
}
