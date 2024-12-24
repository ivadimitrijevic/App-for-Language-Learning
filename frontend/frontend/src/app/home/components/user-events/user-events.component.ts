import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from '../../../event/utils/types/event.type';
import { FriendCardComponent } from '../../../friend/components/friend-card/friend-card.component';
import { EventCardComponent } from '../../../event/components/event-card/event-card.component';

/**
 * UserEvents component
 */
@Component({
  selector: 'app-user-events',
  standalone: true,
  imports: [
    FriendCardComponent,
    EventCardComponent
  ],
  templateUrl: './user-events.component.html',
  styleUrl: './user-events.component.scss'
})
export class UserEventsComponent {
  /**
   * Events
   * @type { Array<Event> }
   */
  @Input() events: Array<Event>;
  /**
   * Emit to parent component when details are opened
   * @type { EventEmitter<{Event}> }
   */
  @Output() openedDetails: EventEmitter<{event: Event}>  = new EventEmitter<{event: Event}>();
}
