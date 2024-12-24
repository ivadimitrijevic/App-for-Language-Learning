import { Component, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { User } from '../../../user/utils/types/user.type';
import { NotificationComponent } from '../../../notifications/components/notification/notification.component';
import { NotificationActions } from '../../../notifications/store/actions/notification.actions';
import { Notification } from '../../../notifications/utils/types/notification.type';
import { selectNotifications } from '../../../notifications/store/reducers/notification.reducer';
import { FriendActions } from '../../../friend/store/actions/friend.actions';
import { ConfirmationPopUpComponent } from '../../../messages-pop-up/confirmation-pop-up/confirmation-pop-up.component';

/**
 * Header component
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NotificationComponent,
    AsyncPipe,
    ConfirmationPopUpComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  /**
   * Indicator whether confirmation pop up is displayed
   * @type { boolean }
   */
  public displayConfirmation: boolean = false;
  /**
   * Message
   * @type { string }
   */
  public message: string;
  /**
   * Observable of notifications
   * @type { Observable<Array<Notification>> }
   */
  public notifications$: Observable<Array<Notification>> = this.store.select(selectNotifications);
  /**
   * Title
   * @type { string }
   */
  @Input() title: string;
  /**
   * Indicator whether greeting message should be displayed
   * @type { boolean }
   */
  @Input() greetingMessage: boolean;
  /**
   * Current user
   * @type { User }
   */
  @Input() currentUser: User;

  /**
   * Constructor of header-component
   * @param store
   */
  constructor(private store: Store) {
  }

  /**
   * Method for opening notifications component
   */
  public openNotifications() {
    this.store.dispatch(NotificationActions.loadAll({userId: this.currentUser.id}));
  }

  /**
   * Method for setting notification as seen
   * @param { number } id
   */
  public updateNotification(id: number) {
    this.store.dispatch(NotificationActions.update({ id, seen: true }));
  }

  /**
   * Method for updating friendship
   * @param data
   */
  public updateFriendship(data: { id: number, fromUser: User, toUser: User, active: boolean, message: string }) {
    this.updateNotification(data.id);
    this.store.dispatch(FriendActions.update({ fromUser: data.fromUser.id, toUser: data.toUser.id, active: data.active }));
    const text: string = data.toUser.name + ' ' + data.toUser.surname + ' has ' + (data.active ? 'accepted ' : 'declined ') + 'your request for friendship.';
    this.store.dispatch(NotificationActions.create({ fromUser: data.toUser.id, toUser: data.fromUser.id, seen: false, notificationType: 'response', text: text }));
    this.message = data.message;
    this.displayConfirmation = true;
  }
}
