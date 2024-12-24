import { createActionGroup, props } from '@ngrx/store';

import { Event } from '../../utils/types/event.type';
import { User } from '../../../user/utils/types/user.type';

/**
 * EventApi actions
 */
export const EventApiActions = createActionGroup({
  source: 'Event/API',
  events: {
    loadAllSuccess: props<{ data: any }>(),
    createSuccess: props<{ event: Event }>(),
    updateSuccess: props<{ event: Event }>(),
    registerForEventSuccess: props<{ user: User, event: Event }>(),
    removeFromEventSuccess: props<{ user: User, eventId: number }>(),
    loadUserEventsSuccess: props<{ events: Array<Event> }>(),
    loadEventUsersSuccess: props<{ users: Array<User> }>(),
  }
});
