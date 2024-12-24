import { Component, Input } from '@angular/core';

import { Event } from '../../utils/types/event.type';
import { DatePipe } from '@angular/common';

/**
 * EventCard component
 */
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  /**
   * Event
   * @type { Event }
   */
  @Input() event: Event;
}
