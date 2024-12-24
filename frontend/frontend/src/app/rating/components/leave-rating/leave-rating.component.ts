import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

import { User } from '../../../user/utils/types/user.type';

/**
 * LeaveRating component
 */
@Component({
  selector: 'app-leave-rating',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './leave-rating.component.html',
  styleUrl: './leave-rating.component.scss'
})
export class LeaveRatingComponent {
  /**
   * Stars
   * @type { Array<number> }
   */
  public stars: Array<number> = [1, 2, 3, 4, 5];
  /**
   * Rating
   * @type { number }
   */
  public rating: number = 0;
  /**
   * Text
   * @type { string }
   */
  public text: string = '';
  /**
   * User
   * @type { User }
   */
  @Input() user: User;
  /**
   * Emit to parent component when closed
   * @type { EventEmitter<void> }
   */
  @Output() closingAction: EventEmitter<void> = new EventEmitter<void>();
  /**
   * Emit to parent component when review is left
   * @type { text?: string, rating: number, friendId: number }
   */
  @Output() leftRating: EventEmitter<{ text?: string, rating: number, friendId: number }> =
    new EventEmitter<{ text?: string, rating: number, friendId: number }>();
  /**
   * Method for setting rating
   * @param { number } value
   */
  setRating(value: number): void {
    this.rating = value;
  }

  /**
   * Method for leaving rating
   */
  public leaveRating() {
    this.leftRating.emit({
      text: this.text,
      rating: this.rating,
      friendId: this.user.id
    });
  }
}
