import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../user/utils/types/user.type';
import { UserPicturePlaceholderPipe } from '../../../user/pipes/user-picture-placeholder.pipe';

/**
 * FriendCard component
 */
@Component({
  selector: 'app-friend-card',
  standalone: true,
  imports: [
    UserPicturePlaceholderPipe
  ],
  templateUrl: './friend-card.component.html',
  styleUrl: './friend-card.component.scss'
})
export class FriendCardComponent {
  /**
   * User
   * @type { User }
   */
  @Input() user: User;
  /**
   * Indicator whether review is left
   * @type { boolean }
   */
  @Input() reviewLeft: boolean;
  /**
   * Emit to parent component when review should be left
   * @type { EventEmitter<User> }
   */
  @Output() openedReview: EventEmitter<User> = new EventEmitter<User>();
}
