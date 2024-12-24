import { createActionGroup, emptyProps, props } from '@ngrx/store';

/**
 * Rating actions
 */
export const RatingActions = createActionGroup({
  source: 'Rating',
  events: {
    loadAll: props<{ userId: number }>(),
    create: props<{ fromUser: number, toUser: number, rating: number, text: string }>(),
  }
});
