import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Friend } from '../../utils/types/friend.type';
import { User } from '../../../user/utils/types/user.type';
import { FriendCardComponent } from '../friend-card/friend-card.component';

/**
 * Friends component
 */
@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    FriendCardComponent
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent {
  /**
   * Friends
   * @type { Array<Friend> }
   */
  @Input() friends: Array<Friend>;
  /**
   * Current user
   * @type { User }
   */
  @Input() currentUser: User;
  /**
   * Emit to parent component when review should be left
   * @type { EventEmitter<User> }
   */
  @Output() openedReview: EventEmitter<User> = new EventEmitter<User>();
}
