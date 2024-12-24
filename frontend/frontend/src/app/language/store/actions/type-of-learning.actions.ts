import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { TypeOfLearning } from '../../utils/types/type-of-learning.type';

/**
 * TypeOfLearning actions
 */
export const TypeOfLearningActions = createActionGroup({
  source: 'TypeOfLearning',
  events: {
    loadAll: emptyProps(),
    create: props<{ name: string }>(),
    update: props<{ typeId: number; name: string }>(),
    updateOrder: props<{ typesOfLearning: Array<TypeOfLearning> }>(),
  }
});
