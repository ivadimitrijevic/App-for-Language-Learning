import { createActionGroup, props } from '@ngrx/store';

import { User } from '../../../user/utils/types/user.type';
import { Event } from '../../utils/types/event.type';

/**
 * Event actions
 */
export const EventActions = createActionGroup({
  source: 'Event',
  events: {
    loadAll: props<{ city?: string, country?: string, language?: string, date?: Date, page?: number }>(),
    create: props<{ eventMaker: number, name: string, description: string, city: string, country: string, address: string, language: string, date: Date, time: string, maxPeople: number, picture?: string }>(),
    update: props<{ id: number, eventMaker: number, name: string, description: string, city: string, country: string, address: string, language: string, date: Date, time: string, maxPeople: number, picture?: string }>(),
    registerForEvent: props<{ user: User; event: Event }>(),
    removeFromEvent: props<{ user: User, eventId: number }>(),
    loadUserEvents: props<{ userId: number }>(),
    loadEventUsers: props<{ eventId: number }>(),
  }
});
