import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Event } from '../../utils/types/event.type';
import { User } from '../../../user/utils/types/user.type';

/**
 * DetailedEventCard
 */
@Component({
  selector: 'app-detailed-event-card',
  standalone: true,
  imports: [],
  templateUrl: './detailed-event-card.component.html',
  styleUrl: './detailed-event-card.component.scss'
})
export class DetailedEventCardComponent {
  /**
   * Event
   * @type { Event }
   */
  @Input() event: Event;
  /**
   * Current User
   * @type { User }
   */
  @Input() currentUser: User;
  /**
   * Participants of event
   * @type { Array<User> }
   */
  @Input() participants: Array<User>;
  /**
   * User's events
   * @type { Array<Event> }
   */
  @Input() usersEvents: Array<Event>;
  /**
   * Emit to parent component when closing
   * @type { Event }
   */
  @Output() closingAction: EventEmitter<void> = new EventEmitter<void>();
  /**
   * Emit to parent component when event is in edit mode
   * @type { EventEmitter<void> }
   */
  @Output() editEvent: EventEmitter<void> = new EventEmitter<void>();
  /**
   * Emit to parent component when leaving event
   * @type { EventEmitter<void> }
   */
  @Output() leaveEvent: EventEmitter<User> = new EventEmitter<User>();
  /**
   * Emit to parent component when joining event
   * @type { EventEmitter<void> }
   */
  @Output() joinEvent: EventEmitter<User> = new EventEmitter<User>();

  /**
   * Method for checking if user is participating selected event
   */
  public participant() {
    return this.usersEvents.find((userEvent) =>  userEvent.id === this.event.id);
  }
}
