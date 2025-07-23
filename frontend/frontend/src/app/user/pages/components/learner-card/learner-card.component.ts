import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Learner } from '../../../utils/types/learner.type';
import { UserPicturePlaceholderPipe } from '../../../pipes/user-picture-placeholder.pipe';
import { NgIf, NgOptimizedImage } from '@angular/common';

/**
 * LearnerCard component
 */
@Component({
  selector: 'app-learner-card',
  standalone: true,
  imports: [
    UserPicturePlaceholderPipe,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './learner-card.component.html',
  styleUrl: './learner-card.component.scss'
})
export class LearnerCardComponent {
  /**
   * Learner
   * @type { Learner }
   */
  @Input() learner: Learner;
  /**
   * Emit to parent component when request for friendship is sent
   * @type { EventEmitter<number> }
   */
  @Output() requestSent: EventEmitter<number> = new EventEmitter<number>();
  /**
   * Emit to parent component when user is chosen
   * @type { EventEmitter<number> }
   */
  @Output() openedDetails: EventEmitter<number> = new EventEmitter<number>();
}
