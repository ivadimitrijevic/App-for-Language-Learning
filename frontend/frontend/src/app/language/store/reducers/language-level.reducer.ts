import { createFeature, createReducer, on } from "@ngrx/store";

import { LanguageLevel } from '../../utils/types/language-level.type';
import { LanguageLevelApiActions } from '../actions/language-level-api.actions';

/**
 * LanguageLevel state
 */
export interface LanguageLevelState {
  levels: Array<LanguageLevel>;
  level: LanguageLevel;
}

/**
 * Initial state
 */
export const initialState: LanguageLevelState = {
  levels: null,
  level: null,
}

/**
 * Language level feature
 */
export const languageLevelFeature = createFeature({
  name: 'language level',
  reducer: createReducer(
    initialState,
    on(LanguageLevelApiActions.createSuccess, (state, { level }) => ({
      ...state,
      levels: state.levels ? [ ...state.levels, level ] : [level]
    })),
    on(LanguageLevelApiActions.loadAllSuccess, (state, { levels }) => ({
      ...state,
      levels,
    })),
    on(LanguageLevelApiActions.updateSuccess, (state, { level }) => ({
      ...state,
      levels: state.levels.map((languageLevel) => languageLevel.id === level.id ? level : languageLevel),
    })),
    on(LanguageLevelApiActions.changeOrderSuccess, (state, { reorderedLevels }) => ({
      ...state,
      levels: reorderedLevels,
    })),
  )
});

export const {
  name,
  selectLevels,
  selectLevel,
} = languageLevelFeature;
