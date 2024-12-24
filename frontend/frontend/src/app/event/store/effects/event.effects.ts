import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";

import { Observable, switchMap } from "rxjs";
import { map } from "rxjs/operators";

import { Event } from '../../utils/types/event.type';
import { EventService } from '../../services/event.service';
import { EventActions } from '../actions/event.actions';
import { EventApiActions } from '../actions/event-api.actions';
import { User } from '../../../user/utils/types/user.type';

/**
 * Event Effects
 */
@Injectable()
export class EventEffects {
  /**
   * Constructor for Event effect
   * @param actions$
   * @param { EventService } eventService
   */
  constructor(
    private actions$: Actions,
    private eventService: EventService,
  ){}

  /**
   * Effect for creating event
   * dispatched when 'create' action is triggered
   * @type { Observable<Action> }
   */
  create$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(EventActions.create.type),
    switchMap(({ eventMaker, name, description, city, country, address, language, date, time, maxPeople, picture }) => this.eventService.createEvent(
      eventMaker, name, description, city, country, address, language, date, time, maxPeople, picture
    ).pipe(
      map((event: Event) =>  EventApiActions.createSuccess({ event }))
    ))
  )});

  /**
   * Effect for getting all the events
   * dispatched when 'loadAll' action is dispatched
   * @type { Observable<Action> }
   */
  loadAll$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(EventActions.loadAll.type),
    switchMap(({ city, country, language, date, page }) => this.eventService.getAll(city, country, language, date, page).pipe(
      map((data: any) => EventApiActions.loadAllSuccess({ data }))
    ))
  )});

  /**
   * Effect for updating event
   * dispatched when 'update' action is dispatched
   * @type { Observable<Action> }
   */
  updateEvent$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(EventActions.update.type),
    switchMap(({ id, eventMaker, name, description, city, country, address, language, date, time, maxPeople, picture }) =>
      this.eventService.updateEvent(id,eventMaker, name, description, city, country, address, language, date, time, maxPeople, picture).pipe(
      map((event: Event) => EventApiActions.updateSuccess({ event }))
    ))
  )});

  /**
   * Effect for creating participant
   * dispatched when 'registerForEvent' action is dispatched
   * @type { Observable<Action> }
   */
  createParticipant$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(EventActions.registerForEvent.type),
    switchMap(({ user, event }) =>
      this.eventService.registerForEvent(user, event).pipe(
        map((user: User) => EventApiActions.registerForEventSuccess({ user, event }))
      ))
  )});

  /**
   * Effect for removing participant
   * dispatched when 'removeFromEvent' action is dispatched
   * @type { Observable<Action> }
   */
  removeParticipant$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(EventActions.removeFromEvent.type),
    switchMap(({ user, eventId }) =>
      this.eventService.removeUserFromEvent(user, eventId).pipe(
        map((data: { user: User, eventId: number }) => EventApiActions.removeFromEventSuccess({ user, eventId }))
      ))
  )});

  /**
   * Effect for loading user's events
   * dispatched when 'loadUserEvents' action is dispatched
   * @type { Observable<Action> }
   */
  loadUserEvents$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(EventActions.loadUserEvents.type),
    switchMap(({ userId }) =>
      this.eventService.getUserEvents(userId).pipe(
        map((events: Array<Event>) => EventApiActions.loadUserEventsSuccess({ events }))
      ))
  )});

  /**
   * Effect for loading event's participants
   * dispatched when 'loadEventUsers' action is dispatched
   * @type { Observable<Action> }
   */
  loadEventUsers$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(EventActions.loadEventUsers.type),
    switchMap(({ eventId }) =>
      this.eventService.getEventUsers(eventId).pipe(
        map((users: Array<User>) => EventApiActions.loadEventUsersSuccess({ users }))
      ))
  )});
}
