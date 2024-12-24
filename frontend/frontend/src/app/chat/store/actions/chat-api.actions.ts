import { createActionGroup, props } from '@ngrx/store';

import { Message } from '../../utils/types/message.type';

/**
 * ChatApi actions
 */
export const ChatApiActions = createActionGroup({
  source: 'Chat/API',
  events: {
    loadAllSuccess: props<{ data: any }>(),
    createSuccess: props<{ message: Message }>(),
  }
});
