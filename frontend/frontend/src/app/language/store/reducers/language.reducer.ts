import { createFeature, createReducer, on } from "@ngrx/store";

import { Language } from '../../utils/types/language.type';
import { LanguageApiActions } from '../actions/language-api.actions';

/**
 * Language state
 */
export interface LanguageState {
  knownLanguages: Array<Language>;
  learningLanguages: Array<Language>;
}

/**
 * Initial state
 */
export const initialState: LanguageState = {
  knownLanguages: null,
  learningLanguages: null,
}

/**
 * Language feature
 */
export const languageFeature = createFeature({
  name: 'language',
  reducer: createReducer(
    initialState,
    on(LanguageApiActions.loadAllKnownSuccess, (state, { languages }) => ({
      ...state,
      knownLanguages: languages,
    })),
    on(LanguageApiActions.loadAllLearningSuccess, (state, { languages }) => ({
      ...state,
      learningLanguages: languages,
    })),
    on(LanguageApiActions.createSuccess, (state, { language }) => ({
      ...state,
      learningLanguages: language.know ?
        state.learningLanguages : state.learningLanguages ?
          [ ...state.learningLanguages, language ] : [language],
      knownLanguages: language.know ?
        state.knownLanguages ? [ ...state.knownLanguages, language ] : [language] :
        state.knownLanguages
    })),
    on(LanguageApiActions.deleteSuccess, (state, { languageId }) => ({
      ...state,
      learningLanguages: state.learningLanguages ?
        state.learningLanguages.filter((language) => language.id !== languageId) : [],
      knownLanguages: state.knownLanguages ?
        state.knownLanguages.filter((language) => language.id !== languageId) : [],
    })),
    on(LanguageApiActions.updateSuccess, (state, { language }) => ({
      ...state,
      learningLanguages: language.know ?
        state.learningLanguages :
        state.learningLanguages.map((learningLanguage) => learningLanguage.id === language.id ? language : learningLanguage),
      knownLanguages: language.know ?
        state.knownLanguages.map((knowLanguage) => knowLanguage.id === language.id ? language : knowLanguage) :
        state.knownLanguages
    })),
  )
});

export const {
  name,
  selectKnownLanguages,
  selectLearningLanguages,
} = languageFeature;
