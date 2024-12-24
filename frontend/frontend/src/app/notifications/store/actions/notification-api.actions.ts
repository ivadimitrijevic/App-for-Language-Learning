import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Notification } from '../../utils/types/notification.type';

/**
 * NotificationApi actions
 */
export const NotificationApiActions = createActionGroup({
  source: 'Notification/API',
  events: {
    loadAllSuccess: props<{ notifications: Array<Notification> }>(),
    createSuccess: emptyProps(),
    updateSuccess: props<{ notification: Notification }>(),
  }
});
