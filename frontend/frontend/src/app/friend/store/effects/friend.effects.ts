import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";

import { Observable, switchMap } from "rxjs";
import { map } from "rxjs/operators";
import { FriendService } from '../../services/friend.service';
import { FriendActions } from '../actions/friend.actions';
import { Friend } from '../../utils/types/friend.type';
import { FriendApiActions } from '../actions/friend-api.actions';


/**
 * Friend Effects
 */
@Injectable()
export class FriendEffects {
  /**
   * Constructor for Language effect
   * @param actions$
   * @param friendService
   */
  constructor(
    private actions$: Actions,
    private friendService: FriendService,
  ){}

  /**
   * Effect for creating friend
   * dispatched when 'create' action is triggered
   * @type { Observable<Action> }
   */
  create$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(FriendActions.create.type),
    switchMap(({ user, friend, active }) => this.friendService.createFriend(
      user, friend, active
    ).pipe(
      map((friend: Friend) =>  FriendApiActions.createSuccess({ friend }))
    ))
  )});

  /**
   * Effect for getting all the friends from user
   * dispatched when 'loadAll' action is dispatched
   * @type { Observable<Action> }
   */
  loadAll$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(FriendActions.loadAll.type),
    switchMap(({ userId }) => this.friendService.getFriends(userId).pipe(
      map((friends: Array<Friend>) => FriendApiActions.loadAllSuccess({ friends }))
    ))
  )});

  /**
   * Effect for updating friend
   * dispatched when 'update' action is dispatched
   * @type { Observable<Action> }
   */
  updateFriend$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(FriendActions.update.type),
    switchMap(({ fromUser, toUser, active }) => this.friendService.updateFriend(fromUser, toUser, active).pipe(
      map((friend: Friend) => FriendApiActions.updateSuccess({ friend }))
    ))
  )});
}
