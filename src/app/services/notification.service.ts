// notification.service.ts
import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private client: Client;
  private notificationSubject = new Subject<any>();

  constructor() {
    this.connect();
  }

  connect(): void {
    this.client = new Client({
      brokerURL: 'ws://localhost:8006/ws',
      webSocketFactory: () => new SockJS('http://localhost:8006/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    this.client.onConnect = () => {
      this.client.subscribe('/topic/livreur/1', (message: IMessage) => {
        const notification = JSON.parse(message.body);
        this.notificationSubject.next(notification);
        this.showNotificationPopup(notification.message); // Trigger SweetAlert and sound
      });

      this.client.subscribe('/topic/admin', (message: IMessage) => {
        const notification = JSON.parse(message.body);
        this.notificationSubject.next(notification);
        this.showNotificationPopup(notification.message); // Trigger SweetAlert and sound
      });
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.activate();
  }

  getNotifications(): Observable<any> {
    return this.notificationSubject.asObservable();
  }

  private showNotificationPopup(message: string): void {
    // Play notification sound
    const audio = new Audio('assets/notification.mp3'); // Path to sound file
    audio.play().catch(error => console.error('Error playing notification sound:', error));

    // Display SweetAlert popup
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Nouvelle Notification',
      text: message,
      showConfirmButton: false,
      timer: 3000,
      toast: true
    });
  }
}
