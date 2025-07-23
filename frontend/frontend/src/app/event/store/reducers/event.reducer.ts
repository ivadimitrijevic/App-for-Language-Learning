import { createFeature, createReducer, on } from "@ngrx/store";

import { Event } from '../../utils/types/event.type';
import { EventApiActions } from '../actions/event-api.actions';
import { User } from '../../../user/utils/types/user.type';
import { PaginationInformation } from '../../../pagination/utils/types/pagination-information.type';

/**
 * Event state
 */
export interface EventState {
  events: Array<Event>;
  participants: Array<User>;
  userEvents: Array<Event>;
  paginationInformation: PaginationInformation;
}

/**
 * Initial state
 */
export const initialState: EventState = {
  events: null,
  participants: null,
  userEvents: null,
  paginationInformation: null,
}

/**
 * Event feature
 */
export const eventFeature = createFeature({
  name: 'event',
  reducer: createReducer(
    initialState,
    on(EventApiActions.loadAllSuccess, (state, { data }) => ({
      ...state,
      events: data.events,
      paginationInformation: { ...state.paginationInformation, currentPage: data.currentPage, lastPage: data.lastPage, total: data.total, perPage: data.perPage },
    })),
    on(EventApiActions.createSuccess, (state, { event }) => ({
      ...state,
      events: state.events ? [event, ...state.events] : [event],
    })),
    on(EventApiActions.updateSuccess, (state, { event }) => ({
      ...state,
      events: state.events ? state.events.map((stateEvent) => stateEvent.id === event.id ? event : stateEvent) : state.events,
      userEvents: state.userEvents ? state.userEvents.map((stateEvent) => stateEvent.id === event.id ? event : stateEvent) : state.events,
    })),
    on(EventApiActions.registerForEventSuccess, (state, { user, event }) => ({
      ...state,
      participants: state.participants ? [...state.participants, user] : [user],
      userEvents: state.userEvents ? [...state.userEvents, event] : [event]
    })),
    on(EventApiActions.removeFromEventSuccess, (state, { user, eventId }) => ({
      ...state,
      participants: state.participants.filter((participant) => participant.id !== user.id),
      userEvents: state.userEvents ?
        state.userEvents.filter((event) => event.id !== eventId) : state.userEvents,
    })),
    on(EventApiActions.loadEventUsersSuccess, (state, { users }) => ({
      ...state,
      participants: users,
    })),
    on(EventApiActions.loadUserEventsSuccess, (state, { events }) => ({
      ...state,
      userEvents: events,
    })),
  )
});

export const {
  name,
  selectEvents,
  selectUserEvents,
  selectParticipants,
  selectPaginationInformation,
} = eventFeature;
