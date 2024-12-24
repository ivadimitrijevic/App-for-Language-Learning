import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '../../../utils/types/user.type';
import { UserPicturePlaceholderPipe } from '../../../pipes/user-picture-placeholder.pipe';

/**
 * AdminUserCard component
 */
@Component({
  selector: 'app-admin-user-card',
  standalone: true,
  imports: [
    UserPicturePlaceholderPipe
  ],
  templateUrl: './admin-user-card.component.html',
  styleUrl: './admin-user-card.component.scss'
})
export class AdminUserCardComponent {
  /**
   * User
   * @type { User }
   */
  @Input() user: User;
  /**
   * Emit to parent component when user is returned
   * @type { EventEmitter<void> }
   */
  @Output() returnedUser: EventEmitter<void> = new EventEmitter<void>();
  /**
   * Emit to parent component when user is removed
   * @type { EventEmitter<void> }
   */
  @Output() removedUser: EventEmitter<void> = new EventEmitter<void>();
}
