import { createActionGroup, props } from '@ngrx/store';
import { TypeOfLearning } from '../../utils/types/type-of-learning.type';

/**
 * TypeOfLearningApi actions
 */
export const TypeOfLearningApiActions = createActionGroup({
  source: 'TypeOfLearning/API',
  events: {
    loadAllSuccess: props<{ types: Array<TypeOfLearning> }>(),
    createSuccess: props<{ learningType: TypeOfLearning }>(),
    updateSuccess: props<{ learningType: TypeOfLearning }>(),
    updateOrderSuccess: props<{ reorderedTypes: Array<TypeOfLearning> }>(),
  }
});
