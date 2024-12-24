import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { User } from '../../../utils/types/user.type';
import { UserPicturePlaceholderPipe } from '../../../pipes/user-picture-placeholder.pipe';
import { Language } from '../../../../language/utils/types/language.type';
import { Rating } from '../../../../rating/utils/types/rating';

/**
 * DetailedLearnerCard component
 */
@Component({
  selector: 'app-detailed-learner-card',
  standalone: true,
  imports: [
    UserPicturePlaceholderPipe,
    AsyncPipe
  ],
  templateUrl: './detailed-learner-card.component.html',
  styleUrl: './detailed-learner-card.component.scss'
})
export class DetailedLearnerCardComponent {
  public showRatingButton: boolean = true;
  /**
   * User
   * @type { User }
   */
  @Input() user: User;
  /**
   * Learning languages
   * @type { Array<Language> }
   */
  @Input() learningLanguages: Array<Language>;
  /**
   * Known languages
   * @type { Array<Language> }
   */
  @Input() knownLanguages: Array<Language>;
  /**
   * Ratings
   * @type { Array<Rating> }
   */
  @Input() ratings: Array<Rating>;
  /**
   * Indicator whether add friend button will be shown
   * @type { boolean }
   */
  @Input() addFriendButton: boolean;
  /**
   * Emit to parent component when closing
   * @type { EventEmitter<void> }
   */
  @Output() closingAction: EventEmitter<void> = new EventEmitter<void>();
  /**
   * Emit to parent component when ratings should display
   * @type { EventEmitter<number> }
   */
  @Output() showedComments: EventEmitter<number> = new EventEmitter<number>();
  /**
   * Emit to parent component when friend request is sent
   * @type { EventEmitter<number> }
   */
  @Output() sentRequest: EventEmitter<number> = new EventEmitter<number>();

  public showRatings() {
    this.showedComments.emit(this.user.id);
    this.showRatingButton = false;
  }

  public hideRatings() {
    this.showRatingButton = true;
    this.ratings = [];
  }
}
