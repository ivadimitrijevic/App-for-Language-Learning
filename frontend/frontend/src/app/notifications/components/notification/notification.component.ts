import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Notification } from '../../utils/types/notification.type';
import { User } from '../../../user/utils/types/user.type';

/**
 * Notification component
 */
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  /**
   * Indicator whether the notifications component is displayed
   * @type { boolean }
   */
  public displayNotifications: boolean = false;
  /**
   * Notifications
   * @type { Array<Notification> }
   */
  @Input() notifications: Array<Notification>;
  /**
   * Emit to parent component when notifications should be presented
   */
  @Output() openedNotifications: EventEmitter<void> = new EventEmitter<void>();
  /**
   * Emit to parent component when notification is seen
   * @type { EventEmitter<number> }
   */
  @Output() seenNotification: EventEmitter<number> = new EventEmitter<number>();
  /**
   * Emit to parent component when there is action on request
   * @type { EventEmitter}
   */
  @Output() answeredRequest: EventEmitter<{ id: number, fromUser: User, toUser: User, active: boolean, message: string }> =
    new EventEmitter<{ id: number, fromUser: User, toUser: User, active: boolean, message: string }>();
  /**
   * Method for opening notifications component
   */
  public openNotifications() {
    if (!this.displayNotifications) {
      this.openedNotifications.emit();
    }
    this.displayNotifications = !this.displayNotifications;
  }
}
