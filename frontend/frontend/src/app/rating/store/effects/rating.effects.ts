import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";

import { Observable, switchMap } from "rxjs";
import { map } from "rxjs/operators";

import { RatingService } from '../../services/rating.service';
import { RatingActions } from '../actions/rating.actions';
import { Rating } from '../../utils/types/rating';
import { RatingApiActions } from '../actions/rating-api.actions';

/**
 * Rating Effect
 */
@Injectable()
export class RatingEffects {
  /**
   * Constructor for LanguageLevel effect
   * @param actions$
   * @param ratingService
   */
  constructor(
    private actions$: Actions,
    private ratingService: RatingService,
  ){}

  /**
   * Effect for creating rating
   * dispatched when 'create' action is triggered
   * @type { Observable<Action> }
   */
  create$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(RatingActions.create.type),
    switchMap(({ fromUser, toUser, rating, text }) => this.ratingService.createRating(
      fromUser, toUser, rating, text
    ).pipe(
      map((rating: Rating) =>  RatingApiActions.createSuccess({ rating }))
    ))
  )});

  /**
   * Effect for getting all ratings from user
   * dispatched when 'loadAll' action is dispatched
   * @type { Observable<Action> }
   */
  loadAll$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(RatingActions.loadAll.type),
    switchMap(({ userId }) => this.ratingService.getUsersRatings(userId).pipe(
      map((ratings: Array<Rating>) => RatingApiActions.loadAllSuccess({ ratings }))
    ))
  )});
}
