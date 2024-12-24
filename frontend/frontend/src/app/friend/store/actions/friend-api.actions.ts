import { createActionGroup, props } from '@ngrx/store';

import { Friend } from '../../utils/types/friend.type';

/**
 * FriendApi actions
 */
export const FriendApiActions = createActionGroup({
  source: 'Friend/API',
  events: {
    loadAllSuccess: props<{ friends: Array<Friend> }>(),
    createSuccess: props<{ friend: Friend }>(),
    updateSuccess: props<{ friend: Friend }>(),
  }
});
