import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";

import { Observable, switchMap } from "rxjs";
import { map } from "rxjs/operators";

import { NotificationService } from '../../services/notification.service';
import { NotificationActions } from '../actions/notification.actions';
import { NotificationApiActions } from '../actions/notification-api.actions';
import { Notification } from '../../utils/types/notification.type';

/**
 * Notification Effects
 */
@Injectable()
export class NotificationEffects {
  /**
   * Constructor for Notification effect
   * @param actions$
   * @param notificationService
   */
  constructor(
    private actions$: Actions,
    private notificationService: NotificationService,
  ){}

  /**
   * Effect for creating friend
   * dispatched when 'create' action is triggered
   * @type { Observable<Action> }
   */
  create$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(NotificationActions.create.type),
    switchMap(({ fromUser, toUser, text, notificationType, seen }) => this.notificationService.createNotification(fromUser, toUser, text, notificationType, seen).pipe(
      map((notification: Notification) => NotificationApiActions.createSuccess())
    ))
  )});
  // create$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
  //   ofType(NotificationActions.create.type),
  //   switchMap(({ fromUser, toUser, text, notificationType, seen }) => this.notificationService.createNotification(fromUser, toUser, text, notificationType, seen)
  //   // .pipe(
  //   //   map((notifications: Array<Notification>) => NotificationApiActions.loadAllSuccess({ notifications }))
  //   // ))
  // ))});

  //   .pipe(
  //   map((friend: Friend) =>  FriendApiActions.createSuccess({ friend }))
  // )

  /**
   * Effect for getting all the notifications from user
   * dispatched when 'loadAll' action is dispatched
   * @type { Observable<Action> }
   */
  loadAll$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(NotificationActions.loadAll.type),
    switchMap(({ userId }) => this.notificationService.getNotifications(userId).pipe(
      map((notifications: Array<Notification>) => NotificationApiActions.loadAllSuccess({ notifications }))
    ))
  )});

  /**
   * Effect for updating notification
   * dispatched when 'update' action is dispatched
   * @type { Observable<Action> }
   */
  updateNotification$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(NotificationActions.update.type),
    switchMap(({ id, seen }) => this.notificationService.updateNotification(id, seen).pipe(
      map((notification: Notification) => NotificationApiActions.updateSuccess({ notification }))
    ))
  )});
}
