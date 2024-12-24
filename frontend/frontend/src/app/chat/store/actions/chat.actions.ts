import { createActionGroup, props } from '@ngrx/store';

/**
 * Chat actions
 */
export const ChatActions = createActionGroup({
  source: 'Chat',
  events: {
    loadAll: props<{ fromUser: number; toUser: number; page?: number }>(),
    create: props<{ fromUser: number; toUser: number; content: string }>(),
  }
});
