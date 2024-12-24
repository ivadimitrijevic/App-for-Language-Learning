import { createActionGroup, props } from '@ngrx/store';

/**
 * Friend actions
 */
export const FriendActions = createActionGroup({
  source: 'Friend',
  events: {
    loadAll: props<{ userId: number }>(),
    create: props<{ user: number; friend: number; active: boolean }>(),
    update: props<{ fromUser: number; toUser: number; active: boolean }>(),
  }
});
