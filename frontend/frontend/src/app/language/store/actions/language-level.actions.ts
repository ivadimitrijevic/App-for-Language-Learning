import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LanguageLevel } from '../../utils/types/language-level.type';

/**
 * LanguageLevel actions
 */
export const LanguageLevelActions = createActionGroup({
  source: 'LanguageLevel',
  events: {
    loadAll: emptyProps(),
    create: props<{ name: string }>(),
    update: props<{ levelId: number; name: string }>(),
    changeOrder: props<{ levels: Array<LanguageLevel> }>(),
  }
});
