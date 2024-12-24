import { createActionGroup, props } from '@ngrx/store';

import { Language } from '../../utils/types/language.type';

/**
 * LanguageApi actions
 */
export const LanguageApiActions = createActionGroup({
  source: 'Language/API',
  events: {
    loadAllKnownSuccess: props<{ languages: Array<Language> }>(),
    loadAllLearningSuccess: props<{ languages: Array<Language> }>(),
    createSuccess: props<{ language: Language }>(),
    deleteSuccess: props<{ languageId: number }>(),
    updateSuccess: props<{ language: Language }>()
  }
});
