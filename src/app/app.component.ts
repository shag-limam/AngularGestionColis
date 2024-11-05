// // angular import
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   // public props
//   title = 'mantis-free-version';
// }
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { NotificationService } from './services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularGestionColis';
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe(notification => {
      this.notifications.push(notification);
      this.showNotificationPopup(notification.message); // Show SweetAlert popup for each notification
    });
  }

  showNotificationPopup(message: string): void {
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

