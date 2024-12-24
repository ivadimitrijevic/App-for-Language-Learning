import { createActionGroup, props } from '@ngrx/store';

/**
 * Notification actions
 */
export const NotificationActions = createActionGroup({
  source: 'Notification',
  events: {
    loadAll: props<{ userId: number }>(),
    create: props<{ fromUser: number; toUser: number; text: string; notificationType: string; seen: boolean }>(),
    update: props<{ id: number; seen: boolean }>(),
  }
});
