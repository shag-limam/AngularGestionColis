// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';



// @Injectable({
//   providedIn: 'root'
// })
// export class NotificationService {
//   private baseUrl = 'http://localhost:8006/api/notifications';

//   constructor(private http: HttpClient) {}

//   getNotificationsForAdmin(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/admin`);
//   }

//   // Nouvelle méthode pour marquer une notification comme lue
//   markNotificationAsRead(notificationId: number): Observable<void> {
//     return this.http.put<void>(`${this.baseUrl}/markAsRead/${notificationId}`, {});
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Client, IMessage } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8006/api/notifications';
  private client: Client;
  private notificationSubject = new Subject<any>();

  constructor(private http: HttpClient) {
    this.connectToWebSocket();
  }

  connectToWebSocket(): void {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8006/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.client.onConnect = () => {
      this.client.subscribe('/topic/admin', (message: IMessage) => {
        const notification = JSON.parse(message.body);
        this.notificationSubject.next(notification);
      });
    };

    this.client.activate();
  }

  getNotificationsForAdmin(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin`);
  }

  getNewNotifications(): Observable<any> {
    return this.notificationSubject.asObservable();
  }

  markNotificationAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/markAsRead/${notificationId}`, {});
  }
}
