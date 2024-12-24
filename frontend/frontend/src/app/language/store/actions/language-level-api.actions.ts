import { createActionGroup, props } from '@ngrx/store';

import { LanguageLevel } from '../../utils/types/language-level.type';

/**
 * LanguageLevelApi actions
 */
export const LanguageLevelApiActions = createActionGroup({
  source: 'LanguageLevel/API',
  events: {
    loadAllSuccess: props<{ levels: Array<LanguageLevel> }>(),
    createSuccess: props<{ level: LanguageLevel }>(),
    updateSuccess: props<{ level: LanguageLevel }>(),
    changeOrderSuccess: props<{ reorderedLevels: Array<LanguageLevel> }>(),
  }
});
