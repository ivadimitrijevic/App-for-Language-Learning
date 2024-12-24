import { createFeature, createReducer, on } from "@ngrx/store";

import { Friend } from '../../utils/types/friend.type';
import { FriendApiActions } from '../actions/friend-api.actions';
import { RatingApiActions } from '../../../rating/store/actions/rating-api.actions';

/**
 * Friend state
 */
export interface FriendState {
  friends: Array<Friend>;
}

/**
 * Initial state
 */
export const initialState: FriendState = {
  friends: null,
}

/**
 * Friend feature
 */
export const friendFeature = createFeature({
  name: 'friend',
  reducer: createReducer(
    initialState,
    on(FriendApiActions.loadAllSuccess, (state, { friends }) => ({
      ...state,
      friends,
    })),
    on(FriendApiActions.createSuccess, (state, { friend }) => ({
      ...state,
      friends: state.friends ? [...state.friends, friend] : [friend],
    })),
    on(FriendApiActions.updateSuccess, (state, { friend }) => ({
      ...state,
      friends: state.friends ? state.friends.map((userFriend) => userFriend.id === friend.id ? friend : userFriend) : state.friends,
    })),
    on(RatingApiActions.createSuccess, (state, { rating }) => ({
      ...state,
      friends: state.friends.map((friend) => rating.toUser.id === friend.user.id || rating.toUser.id === friend.friend.id ? { ...friend, leftReview: true } : friend)
    })),
  )
});

export const {
  name,
  selectFriends,
} = friendFeature;
