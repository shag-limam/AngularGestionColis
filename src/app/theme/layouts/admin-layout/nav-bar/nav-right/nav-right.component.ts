// // angular import
// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { RouterModule } from '@angular/router';

// // project import
// import { SharedModule } from 'src/app/theme/shared/shared.module';

// // third party

// // icon
// import { IconService } from '@ant-design/icons-angular';
// import {
//   BellOutline,
//   SettingOutline,
//   GiftOutline,
//   MessageOutline,
//   PhoneOutline,
//   CheckCircleOutline,
//   LogoutOutline,
//   EditOutline,
//   UserOutline,
//   ProfileOutline,
//   WalletOutline,
//   QuestionCircleOutline,
//   LockOutline,
//   CommentOutline,
//   UnorderedListOutline,
//   ArrowRightOutline,
//   GithubOutline
// } from '@ant-design/icons-angular/icons';

// @Component({
//   selector: 'app-nav-right',
//   standalone: true,
//   imports: [SharedModule, RouterModule],
//   templateUrl: './nav-right.component.html',
//   styleUrls: ['./nav-right.component.scss']
// })
// export class NavRightComponent {
//   @Input() styleSelectorToggle!: boolean;
//   @Output() Customize = new EventEmitter();
//   windowWidth: number;
//   screenFull: boolean = true;

//   constructor(private iconService: IconService) {
//     this.windowWidth = window.innerWidth;
//     this.iconService.addIcon(
//       ...[
//         CheckCircleOutline,
//         GiftOutline,
//         MessageOutline,
//         SettingOutline,
//         PhoneOutline,
//         LogoutOutline,
//         UserOutline,
//         EditOutline,
//         ProfileOutline,
//         QuestionCircleOutline,
//         LockOutline,
//         CommentOutline,
//         UnorderedListOutline,
//         ArrowRightOutline,
//         BellOutline,
//         GithubOutline,
//         WalletOutline
//       ]
//     );
//   }

//   profile = [
//     {
//       icon: 'edit',
//       title: 'Edit Profile'
//     },
//     {
//       icon: 'user',
//       title: 'View Profile'
//     },
//     {
//       icon: 'profile',
//       title: 'Social Profile'
//     },
//     {
//       icon: 'wallet',
//       title: 'Billing'
//     }
//   ];

//   setting = [
//     {
//       icon: 'question-circle',
//       title: 'Support'
//     },
//     {
//       icon: 'user',
//       title: 'Account Settings'
//     },
//     {
//       icon: 'lock',
//       title: 'Privacy Center'
//     },
//     {
//       icon: 'comment',
//       title: 'Feedback'
//     },
//     {
//       icon: 'unordered-list',
//       title: 'History'
//     }
//   ];
// }


1
// import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { NotificationService } from '../nav-right/notification.service'; // Assurez-vous que le chemin est correct
// import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { IconService } from '@ant-design/icons-angular';
// import {
//   BellOutline,
//   SettingOutline,
//   GiftOutline,
//   MessageOutline,
//   PhoneOutline,
//   CheckCircleOutline,
//   LogoutOutline,
//   EditOutline,
//   UserOutline,
//   ProfileOutline,
//   WalletOutline,
//   QuestionCircleOutline,
//   LockOutline,
//   CommentOutline,
//   UnorderedListOutline,
//   ArrowRightOutline,
//   GithubOutline
// } from '@ant-design/icons-angular/icons';

// @Component({
//   selector: 'app-nav-right',
//   standalone: true,
//   imports: [SharedModule, RouterModule],
//   templateUrl: './nav-right.component.html',
//   styleUrls: ['./nav-right.component.scss']
// })
// export class NavRightComponent implements OnInit {
//   @Input() styleSelectorToggle!: boolean;
//   @Output() Customize = new EventEmitter();
//   windowWidth: number;
//   screenFull: boolean = true;
//   notifications: any[] = [];  // Liste des notifications
//   unreadCount: number = 0;    // Nombre de notifications non lues

//   constructor(private iconService: IconService, private notificationService: NotificationService) {
//     this.windowWidth = window.innerWidth;
//     this.iconService.addIcon(
//       ...[
//         CheckCircleOutline,
//         GiftOutline,
//         MessageOutline,
//         SettingOutline,
//         PhoneOutline,
//         LogoutOutline,
//         UserOutline,
//         EditOutline,
//         ProfileOutline,
//         QuestionCircleOutline,
//         LockOutline,
//         CommentOutline,
//         UnorderedListOutline,
//         ArrowRightOutline,
//         BellOutline,
//         GithubOutline,
//         WalletOutline
//       ]
//     );
//   }

//   ngOnInit(): void {
//     this.fetchNotifications();
//   }

//   fetchNotifications(): void {
//     this.notificationService.getNotificationsForAdmin().subscribe({
//       next: (data) => {
//         this.notifications = data;
//         this.unreadCount = this.notifications.filter(notification => !notification.read).length;
//       },
//       error: (err) => {
//         console.error('Erreur lors de la récupération des notifications', err);
//       }
//     });
//   }
// }
2

// import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { Router } from '@angular/router'; // Injecting Router for navigation
// import { NotificationService } from '../nav-right/notification.service';
// import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { IconService } from '@ant-design/icons-angular';
// import { RouterModule } from '@angular/router'; // Import RouterModule for standalone component compatibility
// import {
//   BellOutline,
//   SettingOutline,
//   GiftOutline,
//   MessageOutline,
//   PhoneOutline,
//   CheckCircleOutline,
//   LogoutOutline,
//   EditOutline,
//   UserOutline,
//   ProfileOutline,
//   WalletOutline,
//   QuestionCircleOutline,
//   LockOutline,
//   CommentOutline,
//   UnorderedListOutline,
//   ArrowRightOutline,
//   GithubOutline
// } from '@ant-design/icons-angular/icons';

// @Component({
//   selector: 'app-nav-right',
//   standalone: true,
//   imports: [SharedModule, RouterModule], // Use RouterModule here instead of Router
//   templateUrl: './nav-right.component.html',
//   styleUrls: ['./nav-right.component.scss']
// })
// export class NavRightComponent implements OnInit {
//   @Input() styleSelectorToggle!: boolean;
//   @Output() Customize = new EventEmitter();
//   notifications: any[] = [];  // Liste des notifications
//   unreadCount: number = 0;    // Nombre de notifications non lues

//   constructor(
//     private router: Router, // Inject Router service here
//     private iconService: IconService,
//     private notificationService: NotificationService
//   ) {
//     this.iconService.addIcon(
//       ...[
//         CheckCircleOutline,
//         GiftOutline,
//         MessageOutline,
//         SettingOutline,
//         PhoneOutline,
//         LogoutOutline,
//         UserOutline,
//         EditOutline,
//         ProfileOutline,
//         QuestionCircleOutline,
//         LockOutline,
//         CommentOutline,
//         UnorderedListOutline,
//         ArrowRightOutline,
//         BellOutline,
//         GithubOutline,
//         WalletOutline
//       ]
//     );
//   }

//   ngOnInit(): void {
//     this.fetchNotifications();
//   }

//   fetchNotifications(): void {
//     this.notificationService.getNotificationsForAdmin().subscribe({
//       next: (data) => {
//         this.notifications = data;
//         this.unreadCount = this.notifications.filter(notification => !notification.read).length;
//       },
//       error: (err) => {
//         console.error('Erreur lors de la récupération des notifications', err);
//       }
//     });
//   }

//   // Méthode pour ouvrir les détails du véhicule en fonction de l'ID contenu dans la notification
//   openVehiculeDetails(notification: any): void {
//     // Vérifier si la notification contient un véhicule et un id pour la navigation
//     if (notification.vehicule && notification.vehicule.id) {
//       this.router.navigate([`/vehicules/${notification.vehicule.id}/view`]);
//     } else {
//       console.warn('No vehicule ID found in notification');
//     }
//   }  
  
// }

3

// import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { NotificationService } from '../nav-right/notification.service';
// import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { IconService } from '@ant-design/icons-angular';
// import { RouterModule } from '@angular/router';
// import {
//   BellOutline,
//   CheckCircleOutline,
//   GiftOutline,
//   MessageOutline,
//   SettingOutline,
//   PhoneOutline,
//   LogoutOutline,
//   UserOutline,
//   ProfileOutline,
//   QuestionCircleOutline,
//   LockOutline,
//   CommentOutline,
//   UnorderedListOutline,
//   ArrowRightOutline,
//   GithubOutline,
//   WalletOutline
// } from '@ant-design/icons-angular/icons';

// @Component({
//   selector: 'app-nav-right',
//   standalone: true,
//   imports: [SharedModule, RouterModule],
//   templateUrl: './nav-right.component.html',
//   styleUrls: ['./nav-right.component.scss']
// })
// export class NavRightComponent implements OnInit {
//   @Input() styleSelectorToggle!: boolean;
//   @Output() Customize = new EventEmitter();
//   notifications: any[] = [];
//   unreadCount: number = 0;
//   isNotificationListOpen: boolean = false; // Variable pour gérer l'état d'ouverture de la liste

//   constructor(
//     private router: Router,
//     private iconService: IconService,
//     private notificationService: NotificationService
//   ) {
//     this.iconService.addIcon(
//       ...[
//         CheckCircleOutline,
//         GiftOutline,
//         MessageOutline,
//         SettingOutline,
//         PhoneOutline,
//         LogoutOutline,
//         UserOutline,
//         ProfileOutline,
//         QuestionCircleOutline,
//         LockOutline,
//         CommentOutline,
//         UnorderedListOutline,
//         ArrowRightOutline,
//         BellOutline,
//         GithubOutline,
//         WalletOutline
//       ]
//     );
//   }

//   ngOnInit(): void {
//     this.fetchNotifications();
//   }

//   fetchNotifications(): void {
//     this.notificationService.getNotificationsForAdmin().subscribe({
//       next: (data) => {
//         this.notifications = data;
//         this.unreadCount = this.notifications.filter(notification => !notification.read).length;
//       },
//       error: (err) => {
//         console.error('Erreur lors de la récupération des notifications', err);
//       }
//     });
//   }

//   // Marquer comme lu et ouvrir les détails du véhicule
//   openVehiculeDetails(notification: any): void {
//     if (notification.vehicule && notification.vehicule.id) {
//       this.notificationService.markNotificationAsRead(notification.id).subscribe(() => {
//         notification.read = true; // Marquer la notification comme lue dans l'interface
//         this.unreadCount = this.notifications.filter(n => !n.read).length; // Mettre à jour le nombre de non-lues
//         this.isNotificationListOpen = false; // Fermer la liste des notifications
//         this.router.navigate([`/vehicules/${notification.vehicule.id}/view`]);
//       });
//     }
//   }

//   toggleNotificationList(): void {
//     this.isNotificationListOpen = !this.isNotificationListOpen;
//   }
// }

4

// import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { NotificationService } from '../nav-right/notification.service';
// import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { formatDistanceToNow } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import { RouterModule } from '@angular/router';
// import { IconService } from '@ant-design/icons-angular';
// import { ChangeDetectorRef } from '@angular/core';


// import {
//   BellOutline,
//   CheckCircleOutline,
//   GiftOutline,
//   MessageOutline,
//   SettingOutline,
//   PhoneOutline,
//   LogoutOutline,
//   UserOutline,
//   ProfileOutline,
//   QuestionCircleOutline,
//   LockOutline,
//   CommentOutline,
//   UnorderedListOutline,
//   ArrowRightOutline,
//   GithubOutline,
//   WalletOutline
// } from '@ant-design/icons-angular/icons';

// @Component({
//   selector: 'app-nav-right',
//   standalone: true,
//   imports: [SharedModule, RouterModule],
//   templateUrl: './nav-right.component.html',
//   styleUrls: ['./nav-right.component.scss']
// })
// export class NavRightComponent implements OnInit {
//   @Input() styleSelectorToggle!: boolean;
//   @Output() Customize = new EventEmitter();
//   notifications: any[] = [];
//   unreadCount: number = 0;
//   isNotificationListOpen: boolean = false;

//   constructor(
//     private router: Router,
//     private notificationService: NotificationService,
//     private iconService: IconService,
//     private cdr: ChangeDetectorRef // Injection de la détection de changement

//   ) {
//     this.iconService.addIcon(
//       BellOutline,
//       GithubOutline,
//       CheckCircleOutline,
//       GiftOutline,
//       MessageOutline,
//       SettingOutline,
//       PhoneOutline,
//       LogoutOutline,
//       UserOutline,
//       ProfileOutline,
//       QuestionCircleOutline,
//       LockOutline,
//       CommentOutline,
//       UnorderedListOutline,
//       ArrowRightOutline,
//       WalletOutline
//     );
//   }

//   ngOnInit(): void {
//     this.fetchNotifications();
//     this.checkForNewNotifications();
//   }

//   fetchNotifications(): void {
//     this.notificationService.getNotificationsForAdmin().subscribe({
//       next: (data) => {
//         // Trier les notifications par ordre chronologique inverse (les plus récentes en haut)
//         this.notifications = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//         this.unreadCount = this.notifications.filter(notification => !notification.read).length;
//       },
//       error: (err) => {
//         console.error('Erreur lors de la récupération des notifications', err);
//       }
//     });
//   }
  

//   checkForNewNotifications(): void {
//     this.notificationService.getNewNotifications().subscribe((newNotification) => {
//       this.notifications.unshift(newNotification);
//       if (!newNotification.read) {
//         this.unreadCount++;
//       }
//     });
//   }

//   openVehiculeDetails(notification: any): void {
//     if (notification.vehicule && notification.vehicule.id) {
//       if (!notification.read) {
//         this.notificationService.markNotificationAsRead(notification.id).subscribe(() => {
//           notification.read = true;
//           this.unreadCount = this.notifications.filter(n => !n.read).length;
//         });
//       }
      
//       this.router.navigate([`/vehicules/${notification.vehicule.id}/view`]);
      
//       setTimeout(() => {
//         this.isNotificationListOpen = false;
//         this.cdr.detectChanges(); // Forcer la mise à jour de l'interface
//       }, 100);
//     }
//   }
  
  
  

//   toggleNotificationList(): void {
//     this.isNotificationListOpen = !this.isNotificationListOpen;
//   }

//   getRelativeDate(date: string): string {
//     return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
//   }
// }

5

// import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { NotificationService } from '../nav-right/notification.service';
// import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { formatDistanceToNow } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import { IconService } from '@ant-design/icons-angular';
// import { ChangeDetectorRef } from '@angular/core';

// import {
//   BellOutline,
//   CheckCircleOutline,
//   GiftOutline,
//   MessageOutline,
//   SettingOutline,
//   PhoneOutline,
//   LogoutOutline,
//   UserOutline,
//   ProfileOutline,
//   QuestionCircleOutline,
//   LockOutline,
//   CommentOutline,
//   UnorderedListOutline,
//   ArrowRightOutline,
//   GithubOutline,
//   WalletOutline
// } from '@ant-design/icons-angular/icons';

// @Component({
//   selector: 'app-nav-right',
//   standalone: true,
//   imports: [SharedModule],
//   templateUrl: './nav-right.component.html',
//   styleUrls: ['./nav-right.component.scss']
// })
// export class NavRightComponent implements OnInit {
//   @Input() styleSelectorToggle!: boolean;
//   @Output() Customize = new EventEmitter();
//   notifications: any[] = [];
//   unreadCount: number = 0;
//   isNotificationListOpen: boolean = false;

//   constructor(
//     private router: Router,
//     private notificationService: NotificationService,
//     private iconService: IconService,
//     private cdr: ChangeDetectorRef
//   ) {
//     this.iconService.addIcon(
//       BellOutline,
//       GithubOutline,
//       CheckCircleOutline,
//       GiftOutline,
//       MessageOutline,
//       SettingOutline,
//       PhoneOutline,
//       LogoutOutline,
//       UserOutline,
//       ProfileOutline,
//       QuestionCircleOutline,
//       LockOutline,
//       CommentOutline,
//       UnorderedListOutline,
//       ArrowRightOutline,
//       WalletOutline
//     );
//   }

//   ngOnInit(): void {
//     this.fetchNotifications();
//     this.checkForNewNotifications();
//   }

//   fetchNotifications(): void {
//     this.notificationService.getNotificationsForAdmin().subscribe({
//       next: (data) => {
//         this.notifications = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//         this.unreadCount = this.notifications.filter(notification => !notification.read).length;
//       },
//       error: (err) => {
//         console.error('Erreur lors de la récupération des notifications', err);
//       }
//     });
//   }

//   checkForNewNotifications(): void {
//     this.notificationService.getNewNotifications().subscribe((newNotification) => {
//       this.notifications.unshift(newNotification);
//       if (!newNotification.read) {
//         this.unreadCount++;
//       }
//     });
//   }

//   openVehiculeDetails(notification: any): void {
//     if (notification.vehicule && notification.vehicule.id) {
//       if (!notification.read) {
//         this.notificationService.markNotificationAsRead(notification.id).subscribe(() => {
//           notification.read = true;
//           this.unreadCount = this.notifications.filter(n => !n.read).length;
//         });
//       }
      
//       // Navigation vers la page de détails
//       this.router.navigate([`/vehicules/${notification.vehicule.id}/view`]);
      
//       // Fermer le menu immédiatement
//       this.isNotificationListOpen = false;
//       this.cdr.detectChanges(); // Forcer la mise à jour de l'interface

//       // Optionnel : Réouvrir la liste après une courte pause si nécessaire
//       setTimeout(() => {
//         this.isNotificationListOpen = true;
//         this.cdr.detectChanges();
//       }, 200);
//     }
//   }

//   toggleNotificationList(): void {
//     this.isNotificationListOpen = !this.isNotificationListOpen;
//   }

//   getRelativeDate(date: string): string {
//     return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
//   }
// }

6


// import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
// import { NotificationService } from '../nav-right/notification.service';
// import { SharedModule } from 'src/app/theme/shared/shared.module';
// import { formatDistanceToNow } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import { IconService } from '@ant-design/icons-angular';
// import { ChangeDetectorRef } from '@angular/core';
// import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
// import { Subscription, Subject } from 'rxjs';

// import {
//   BellOutline,
//   CheckCircleOutline,
//   GiftOutline,
//   MessageOutline,
//   SettingOutline,
//   PhoneOutline,
//   LogoutOutline,
//   UserOutline,
//   ProfileOutline,
//   QuestionCircleOutline,
//   LockOutline,
//   CommentOutline,
//   UnorderedListOutline,
//   ArrowRightOutline,
//   GithubOutline,
//   WalletOutline
// } from '@ant-design/icons-angular/icons';

// @Component({
//   selector: 'app-nav-right',
//   standalone: true,
//   imports: [SharedModule],
//   templateUrl: './nav-right.component.html',
//   styleUrls: ['./nav-right.component.scss']
// })
// export class NavRightComponent implements OnInit, OnDestroy {
//   @Input() styleSelectorToggle!: boolean;
//   @Output() Customize = new EventEmitter();
//   notifications: any[] = [];
//   unreadCount: number = 0;
//   isNotificationListOpen: boolean = false;

//   @ViewChild('notificationDropdown', { static: false }) notificationDropdown!: NgbDropdown;

//   private navigationSubscription!: Subscription;
//   private pendingNavigation = new Subject<any>();

//   constructor(
//     private router: Router,
//     private notificationService: NotificationService,
//     private iconService: IconService,
//     private cdr: ChangeDetectorRef
//   ) {
//     this.iconService.addIcon(
//       BellOutline,
//       GithubOutline,
//       CheckCircleOutline,
//       GiftOutline,
//       MessageOutline,
//       SettingOutline,
//       PhoneOutline,
//       LogoutOutline,
//       UserOutline,
//       ProfileOutline,
//       QuestionCircleOutline,
//       LockOutline,
//       CommentOutline,
//       UnorderedListOutline,
//       ArrowRightOutline,
//       WalletOutline
//     );

//     // Écoute de l'événement de navigation pour forcer la détection des changements
//     this.navigationSubscription = this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         this.cdr.detectChanges();
//       }
//     });

//     // Écouteur de clic pour fermer le menu de notifications en cas de clic en dehors
//     document.addEventListener('click', this.onDocumentClick.bind(this));
//   }

//   ngOnInit(): void {
//     this.fetchNotifications();
//     this.checkForNewNotifications();

//     // Abonner le sujet `pendingNavigation` pour gérer la navigation différée
//     this.pendingNavigation.subscribe((notification) => {
//       this.navigateToNotificationDetails(notification);
//     });
//   }

//   ngOnDestroy(): void {
//     if (this.navigationSubscription) {
//       this.navigationSubscription.unsubscribe();
//     }
//     this.pendingNavigation.unsubscribe();
//     document.removeEventListener('click', this.onDocumentClick.bind(this));
//   }

//   // Ferme le menu si on clique en dehors
//   private onDocumentClick(event: Event): void {
//     const target = event.target as HTMLElement;
//     if (!target.closest('.dropdown-menu') && this.isNotificationListOpen) {
//       this.isNotificationListOpen = false;
//       this.notificationDropdown.close();
//       this.cdr.detectChanges();
//     }
//   }

//   fetchNotifications(): void {
//     this.notificationService.getNotificationsForAdmin().subscribe({
//       next: (data) => {
//         this.notifications = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//         this.unreadCount = this.notifications.filter(notification => !notification.read).length;
//       },
//       error: (err) => {
//         console.error('Erreur lors de la récupération des notifications', err);
//       }
//     });
//   }

//   checkForNewNotifications(): void {
//     this.notificationService.getNewNotifications().subscribe((newNotification) => {
//       this.notifications.unshift(newNotification);
//       if (!newNotification.read) {
//         this.unreadCount++;
//       }
//     });
//   }

//   openNotificationDetails(notification: any): void {
//     // Fermer le dropdown s'il est ouvert
//     if (this.notificationDropdown) {
//       this.notificationDropdown.close();
//       this.isNotificationListOpen = false;
//       this.cdr.detectChanges(); // Met à jour immédiatement l'affichage
//     }

//     // Différer la navigation pour garantir la fermeture complète du menu
//     setTimeout(() => {
//       this.pendingNavigation.next(notification);
//     }, 200); // Ajustez ce délai si nécessaire
//   }

//   navigateToNotificationDetails(notification: any): void {
//     // Marquer la notification comme lue
//     if (!notification.read) {
//       this.notificationService.markNotificationAsRead(notification.id).subscribe(() => {
//         notification.read = true;
//         this.unreadCount = this.notifications.filter(n => !n.read).length;
//       });
//     }

//     // Rediriger vers la page appropriée
//     if (notification.vehicule && notification.vehicule.id) {
//       this.router.navigate([`/vehicules/${notification.vehicule.id}/view`]);
//     } else if (notification.livraison && notification.livraison.id) {
//       this.router.navigate([`/livraisons/${notification.livraison.id}/view`]);
//     }

//     this.isNotificationListOpen = false;
//     this.cdr.detectChanges();
//   }

//   toggleNotificationList(): void {
//     this.isNotificationListOpen = !this.isNotificationListOpen;
//   }

//   getRelativeDate(date: string): string {
//     return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
//   }
// }

7


import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NotificationService } from '../nav-right/notification.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { IconService } from '@ant-design/icons-angular';
import { ChangeDetectorRef } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import {
  BellOutline,
  CheckCircleOutline,
  GiftOutline,
  MessageOutline,
  SettingOutline,
  PhoneOutline,
  LogoutOutline,
  UserOutline,
  ProfileOutline,
  QuestionCircleOutline,
  LockOutline,
  CommentOutline,
  UnorderedListOutline,
  ArrowRightOutline,
  GithubOutline,
  WalletOutline
} from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() styleSelectorToggle!: boolean;
  @Output() Customize = new EventEmitter();
  notifications: any[] = [];
  unreadCount: number = 0;
  isNotificationListOpen: boolean = false;

  @ViewChild('notificationDropdown', { static: false }) notificationDropdown!: NgbDropdown | undefined;

  private navigationSubscription!: Subscription;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private iconService: IconService,
    private cdr: ChangeDetectorRef
  ) {
    this.iconService.addIcon(
      BellOutline,
      GithubOutline,
      CheckCircleOutline,
      GiftOutline,
      MessageOutline,
      SettingOutline,
      PhoneOutline,
      LogoutOutline,
      UserOutline,
      ProfileOutline,
      QuestionCircleOutline,
      LockOutline,
      CommentOutline,
      UnorderedListOutline,
      ArrowRightOutline,
      WalletOutline
    );

    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.cdr.detectChanges();
      }
    });
  }

  ngOnInit(): void {
    this.fetchNotifications();
    this.checkForNewNotifications();
  }

  ngAfterViewInit(): void {
    this.notificationDropdown?.close();
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  fetchNotifications(): void {
    this.notificationService.getNotificationsForAdmin().subscribe({
      next: (data) => {
        this.notifications = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.unreadCount = this.notifications.filter(notification => !notification.read).length;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des notifications', err);
      }
    });
  }

  checkForNewNotifications(): void {
    this.notificationService.getNewNotifications().subscribe((newNotification) => {
      this.notifications.unshift(newNotification);
      if (!newNotification.read) {
        this.unreadCount++;
      }
    });
  }

  openNotificationDetails(notification: any): void {
    console.log("Notification sélectionnée :", notification);

    // Ferme le menu de notifications
    this.notificationDropdown?.close();
    console.log("Menu de notifications fermé");

    // Navigue immédiatement après la fermeture
    this.navigateToNotificationDetails(notification);
  }

  private navigateToNotificationDetails(notification: any): void {
    console.log("Navigation vers la notification :", notification);

    if (!notification.read) {
      this.notificationService.markNotificationAsRead(notification.id).subscribe(() => {
        notification.read = true;
        this.unreadCount = this.notifications.filter(n => !n.read).length;
        console.log("Notification marquée comme lue");
      });
    }

    if (notification.vehicule && notification.vehicule.id) {
      this.router.navigate([`/vehicules/${notification.vehicule.id}/view`]).then(() => {
        console.log("Navigation vers le véhicule réussie");
        window.location.reload(); // Recharger la page
      }).catch((err) => console.error("Erreur lors de la navigation vers le véhicule", err));
    } else if (notification.livraison && notification.livraison.id) {
      this.router.navigate([`/livraisons/${notification.livraison.id}/view`]).then(() => {
        console.log("Navigation vers la livraison réussie");
        window.location.reload(); // Recharger la page
      }).catch((err) => console.error("Erreur lors de la navigation vers la livraison", err));
    }
     else {
      console.warn("Aucune destination valide pour cette notification");
    }
  }

  toggleNotificationList(): void {
    if (this.notificationDropdown) {
      this.isNotificationListOpen = !this.isNotificationListOpen;
      this.isNotificationListOpen ? this.notificationDropdown.open() : this.notificationDropdown.close();
    }
  }

  getRelativeDate(date: string): string {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
  }
}
