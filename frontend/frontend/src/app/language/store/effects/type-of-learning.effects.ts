import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";

import { Observable, switchMap } from "rxjs";
import { map } from "rxjs/operators";

import { TypeOfLearningService } from '../../services/type-of-learning.service';
import { TypeOfLearningActions } from '../actions/type-of-learning.actions';
import { TypeOfLearning } from '../../utils/types/type-of-learning.type';
import { TypeOfLearningApiActions } from '../actions/type-of-learning-api.actions';

/**
 * TypeOfLearning Effect
 */
@Injectable()
export class TypeOfLearningEffects {
  /**
   * Constructor for TypeOfLearning effect
   * @param actions$
   * @param typeOfLearningService
   */
  constructor(
    private actions$: Actions,
    private typeOfLearningService: TypeOfLearningService,
  ){}

  /**
   * Effect for creating type of learning
   * dispatched when 'create' action is triggered
   * @type { Observable<Action> }
   */
  create$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(TypeOfLearningActions.create.type),
    switchMap(({ name }) => this.typeOfLearningService.createTypeOfLearning(
      name
    ).pipe(
      map((learningType: TypeOfLearning) =>  TypeOfLearningApiActions.createSuccess({ learningType }))
    ))
  )});

  /**
   * Effect for getting all the types of learning
   * dispatched when 'loadAll' action is dispatched
   * @type { Observable<Action> }
   */
  loadAll$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(TypeOfLearningActions.loadAll.type),
    switchMap(() => this.typeOfLearningService.getTypesOfLearning().pipe(
      map((types: Array<TypeOfLearning>) => TypeOfLearningApiActions.loadAllSuccess({ types }))
    ))
  )});

  /**
   * Effect for updating type of learning
   * dispatched when 'update' action is triggered
   * @type { Observable<Action> }
   */
  update$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(TypeOfLearningActions.update.type),
    switchMap(({ typeId, name }) => this.typeOfLearningService.updateTypeOfLearning(
      typeId, name
    ).pipe(
      map((learningType: TypeOfLearning) =>  TypeOfLearningApiActions.updateSuccess({ learningType }))
    ))
  )});

  /**
   * Effect for updating order of types of learning
   * dispatched when 'changeOrder' action is triggered
   * @type { Observable<Action> }
   */
  updateOrder$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(TypeOfLearningActions.updateOrder.type),
    switchMap(({ typesOfLearning }) => this.typeOfLearningService.updateOrder(
      typesOfLearning
    ).pipe(
      map((reorderedTypes: Array<TypeOfLearning>) =>  TypeOfLearningApiActions.updateOrderSuccess({ reorderedTypes }))
    ))
  )});
}
