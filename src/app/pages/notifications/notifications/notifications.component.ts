// import { Component, OnInit } from '@angular/core';
// import { NotificationService } from '../../../services/notification.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-notifications',
//   templateUrl: './notifications.component.html',
//   styleUrls: ['./notifications.component.scss']
// })
// export class NotificationsComponent implements OnInit {
//   notifications: any[] = [];

//   constructor(private notificationService: NotificationService) {}

//   ngOnInit(): void {
//     this.notificationService.getNotifications().subscribe(notification => {
//       this.notifications.push(notification);
//       this.showNotificationPopup(notification.message); // Display SweetAlert popup
//     });
//   }

//   showNotificationPopup(message: string): void {
//     Swal.fire({
//       title: 'New Notification',
//       text: message,
//       icon: 'info',
//       confirmButtonText: 'OK'
//     });
//   }
// }

// notifications.component.ts (updated)
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe(notification => {
      this.notifications.push(notification);
    });
  }
}
