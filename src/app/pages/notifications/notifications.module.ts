import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule  // Import CommonModule to enable the date pipe
  ]
})
export class NotificationsModule { }
