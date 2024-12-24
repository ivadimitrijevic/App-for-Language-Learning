import { createActionGroup, props } from '@ngrx/store';

import { Language } from '../../utils/types/language.type';

/**
 * Language actions
 */
export const LanguageActions = createActionGroup({
  source: 'Language',
  events: {
    loadAllKnown: props<{ userId: number }>(),
    loadAllLearning: props<{ userId: number }>(),
    create: props<{ name: string; userId: number; levelId: number; know: boolean; types: Array<number> }>(),
    delete: props<{ languageId: number }>(),
    update: props<{ language: Language }>(),
  }
});
