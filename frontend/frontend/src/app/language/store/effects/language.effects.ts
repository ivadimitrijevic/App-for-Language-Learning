import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";

import { Observable, switchMap } from "rxjs";
import { map } from "rxjs/operators";

import { LanguageService } from '../../services/language.service';
import { LanguageActions } from '../actions/language.actions';
import { Language } from '../../utils/types/language.type';
import { LanguageApiActions } from '../actions/language-api.actions';

/**
 * Language Effect
 */
@Injectable()
export class LanguageEffects {
  /**
   * Constructor for Language effect
   * @param actions$
   * @param languageService
   */
  constructor(
    private actions$: Actions,
    private languageService: LanguageService,
  ){}

  /**
   * Effect for creating language
   * dispatched when 'create' action is triggered
   * @type { Observable<Action> }
   */
  create$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(LanguageActions.create.type),
    switchMap(({ name, userId, levelId, know, types }) => this.languageService.createLanguage(
      name, userId, levelId, know, types
    ).pipe(
      map((language: Language) =>  LanguageApiActions.createSuccess({ language }))
    ))
  )});

  /**
   * Effect for getting all the known languages from user
   * dispatched when 'loadAllKnown' action is dispatched
   * @type { Observable<Action> }
   */
  loadAllKnown$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(LanguageActions.loadAllKnown.type),
    switchMap(({ userId }) => this.languageService.getKnownLanguages(userId).pipe(
      map((languages: Array<Language>) => LanguageApiActions.loadAllKnownSuccess({ languages }))
    ))
  )});

  /**
   * Effect for getting all the learning languages from user
   * dispatched when 'loadAllLearning' action is dispatched
   * @type { Observable<Action> }
   */
  loadAllLearning$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(LanguageActions.loadAllLearning.type),
    switchMap(({ userId }) => this.languageService.getLearningLanguages(userId).pipe(
      map((languages: Array<Language>) => LanguageApiActions.loadAllLearningSuccess({ languages }))
    ))
  )});

  /**
   * Effect for deleting language
   * dispatched when 'delete' action is dispatched
   * @type { Observable<Action> }
   */
  deleteLanguage$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(LanguageActions.delete.type),
    switchMap(({ languageId }) => this.languageService.deleteLanguage(languageId).pipe(
      map((languageId: number) => LanguageApiActions.deleteSuccess({ languageId }))
    ))
  )});

  /**
   * Effect for deleting language
   * dispatched when 'update' action is dispatched
   * @type { Observable<Action> }
   */
  updateLanguage$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(LanguageActions.update.type),
    switchMap(({ language }) => this.languageService.updateLanguage(language).pipe(
      map((language: Language) => LanguageApiActions.updateSuccess({ language }))
    ))
  )});
}
