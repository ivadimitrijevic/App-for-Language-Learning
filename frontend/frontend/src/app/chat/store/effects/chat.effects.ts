import { Injectable } from '@angular/core';

import { Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ChatService } from '../../services/chat.service';
import { ChatActions } from '../actions/chat.actions';
import { Message } from '../../utils/types/message.type';
import { ChatApiActions } from '../actions/chat-api.actions';

/**
 * Chat Effects
 */
@Injectable()
export class ChatEffects {
  /**
   * Constructor for Chat effect
   * @param actions$
   * @param chatService
   */
  constructor(
    private actions$: Actions,
    private chatService: ChatService,
  ) {
  }

  /**
   * Effect for creating message
   * dispatched when 'create' action is triggered
   * @type { Observable<Action> }
   */
  create$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChatActions.create.type),
      switchMap(({fromUser, toUser, content}) => this.chatService.createMessage(
        fromUser, toUser, content
      ).pipe(
        map((message: Message) => ChatApiActions.createSuccess({message}))
      ))
    )
  });

  /**
   * Effect for getting all the messages from users
   * dispatched when 'loadAll' action is dispatched
   * @type { Observable<Action> }
   */
  loadAll$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChatActions.loadAll.type),
      switchMap(({fromUser, toUser, page}) => this.chatService.getMessages(fromUser, toUser, page).pipe(
        map((data: any) => ChatApiActions.loadAllSuccess({ data }))
      ))
    )
  });
}
