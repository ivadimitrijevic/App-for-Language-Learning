import { createFeature, createReducer, on } from "@ngrx/store";

import { Rating } from '../../utils/types/rating';
import { RatingApiActions } from '../actions/rating-api.actions';
import { UserActions } from '../../../user/store/actions/user.actions';

/**
 * Rating state
 */
export interface RatingState {
  ratings: Array<Rating>;
}

/**
 * Initial state
 */
export const initialState: RatingState = {
  ratings: null,
}

/**
 * Rating feature
 */
export const ratingFeature = createFeature({
  name: 'rating',
  reducer: createReducer(
    initialState,
    on(RatingApiActions.createSuccess, (state, { rating }) => ({
      ...state,
      ratings: state.ratings ? [...state.ratings, rating] : [rating]
    })),
    on(RatingApiActions.loadAllSuccess, (state, { ratings }) => ({
      ...state,
      ratings,
    })),
    on(UserActions.load, (state, {}) => ({
      ...state,
      ratings: null,
    }))
  )
});

export const {
  name,
  selectRatings,
} = ratingFeature;
