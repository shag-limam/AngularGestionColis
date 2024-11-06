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
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../nav-right/notification.service'; // Assurez-vous que le chemin est correct
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IconService } from '@ant-design/icons-angular';
import {
  BellOutline,
  SettingOutline,
  GiftOutline,
  MessageOutline,
  PhoneOutline,
  CheckCircleOutline,
  LogoutOutline,
  EditOutline,
  UserOutline,
  ProfileOutline,
  WalletOutline,
  QuestionCircleOutline,
  LockOutline,
  CommentOutline,
  UnorderedListOutline,
  ArrowRightOutline,
  GithubOutline
} from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  @Input() styleSelectorToggle!: boolean;
  @Output() Customize = new EventEmitter();
  windowWidth: number;
  screenFull: boolean = true;
  notifications: any[] = [];  // Liste des notifications
  unreadCount: number = 0;    // Nombre de notifications non lues

  constructor(private iconService: IconService, private notificationService: NotificationService) {
    this.windowWidth = window.innerWidth;
    this.iconService.addIcon(
      ...[
        CheckCircleOutline,
        GiftOutline,
        MessageOutline,
        SettingOutline,
        PhoneOutline,
        LogoutOutline,
        UserOutline,
        EditOutline,
        ProfileOutline,
        QuestionCircleOutline,
        LockOutline,
        CommentOutline,
        UnorderedListOutline,
        ArrowRightOutline,
        BellOutline,
        GithubOutline,
        WalletOutline
      ]
    );
  }

  ngOnInit(): void {
    this.fetchNotifications();
  }

  fetchNotifications(): void {
    this.notificationService.getNotificationsForAdmin().subscribe({
      next: (data) => {
        this.notifications = data;
        this.unreadCount = this.notifications.filter(notification => !notification.read).length;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des notifications', err);
      }
    });
  }
}
