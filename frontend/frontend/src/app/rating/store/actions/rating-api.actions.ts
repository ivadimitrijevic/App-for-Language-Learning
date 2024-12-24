import { createActionGroup, props } from '@ngrx/store';
import { Rating } from '../../utils/types/rating';

/**
 * RatingApi actions
 */
export const RatingApiActions = createActionGroup({
  source: 'Rating/API',
  events: {
    loadAllSuccess: props<{ ratings: Array<Rating> }>(),
    createSuccess: props<{ rating: Rating }>(),
  }
});
