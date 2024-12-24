import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";

import { Observable, switchMap } from "rxjs";
import { map } from "rxjs/operators";

import { LanguageLevelService } from '../../services/language-level.service';
import { LanguageLevel } from '../../utils/types/language-level.type';
import { LanguageLevelActions } from '../actions/language-level.actions';
import { LanguageLevelApiActions } from '../actions/language-level-api.actions';

/**
 * LanguageLevels Effect
 */
@Injectable()
export class LanguageLevelEffects {
  /**
   * Constructor for LanguageLevel effect
   * @param actions$
   * @param languageLevelService
   */
  constructor(
    private actions$: Actions,
    private languageLevelService: LanguageLevelService,
  ){}

  /**
   * Effect for creating language level
   * dispatched when 'create' action is triggered
   * @type { Observable<Action> }
   */
  create$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(LanguageLevelActions.create.type),
    switchMap(({ name }) => this.languageLevelService.createLanguageLevel(
      name
    ).pipe(
      map((level: LanguageLevel) =>  LanguageLevelApiActions.createSuccess({ level }))
    ))
  )});

  /**
   * Effect for getting all the language levels
   * dispatched when 'loadAll' action is dispatched
   * @type { Observable<Action> }
   */
  loadAll$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(LanguageLevelActions.loadAll.type),
    switchMap(() => this.languageLevelService.getLanguageLevels().pipe(
      map((levels: Array<LanguageLevel>) => LanguageLevelApiActions.loadAllSuccess({ levels }))
    ))
  )});

  /**
   * Effect for updating language level
   * dispatched when 'update' action is triggered
   * @type { Observable<Action> }
   */
  update$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(LanguageLevelActions.update.type),
    switchMap(({ levelId, name }) => this.languageLevelService.updateLanguageLevel(
      levelId, name
    ).pipe(
      map((level: LanguageLevel) =>  LanguageLevelApiActions.updateSuccess({ level }))
    ))
  )});

  /**
   * Effect for updating order of language levels
   * dispatched when 'changeOrder' action is triggered
   * @type { Observable<Action> }
   */
  updateOrder$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(LanguageLevelActions.changeOrder.type),
    switchMap(({ levels }) => this.languageLevelService.updateOrder(
      levels
    ).pipe(
      map((reorderedLevels: Array<LanguageLevel>) =>  LanguageLevelApiActions.changeOrderSuccess({ reorderedLevels }))
    ))
  )});
}
