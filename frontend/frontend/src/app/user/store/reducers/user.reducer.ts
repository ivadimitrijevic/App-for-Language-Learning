import { createFeature, createReducer, on } from "@ngrx/store";

import { User } from '../../utils/types/user.type';
import { UserActions } from '../actions/user.actions';
import { UserApiActions } from '../actions/user-api.actions';
import { Learner } from '../../utils/types/learner.type';
import { PaginationInformation } from '../../../pagination/utils/types/pagination-information.type';

/**
 * User state
 */
export interface UserState {
  currentUser: User;
  user: User;
  registerSuccess: boolean;
  failureMessage: string;
  users: Array<User>;
  learners: Array<Learner>;
  inactiveUser: boolean;
  failure: boolean;
  paginationInformation: PaginationInformation;
}

/**
 * Initial state
 */
export const initialState: UserState = {
  currentUser: null,
  user: null,
  registerSuccess: null,
  failureMessage: null,
  users: null,
  learners: null,
  inactiveUser: null,
  failure: null,
  paginationInformation: null,
}

/**
 * Current user feature
 */
export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(UserActions.login, (state: UserState, {}) => ({
      ...state,
      currentUser: null,
      failureMessage: null,
      inactiveUser: null,
      failure: null,
    })),
    on(UserApiActions.loginSuccess, (state, { user }) => ({
     ...state,
      currentUser: {...user},
      inactiveUser: !user.active,
    })),
    on(UserApiActions.loginFailure, (state, { message }) => {
      return ({
        ...state,
        failureMessage: message,
        failure: true,
      })}),
    on(UserApiActions.registerSuccess, (state, { user }) => ({
      ...state,
      registerSuccess: !!user,
    })),
    on(UserApiActions.updateSuccess, (state, { user }) => ({
      ...state,
      currentUser: user,

    })),
    on(UserApiActions.loadAllSuccess, (state, { data }) => ({
      ...state,
      learners: data.formattedUsers,
      paginationInformation: { ...state.paginationInformation, currentPage: data.currentPage, lastPage: data.lastPage, total: data.total, perPage: data.perPage },
    })),
    on(UserApiActions.loadAllAdminSuccess, (state, { data }) => ({
      ...state,
      users: data.users,
      paginationInformation: { ...state.paginationInformation, currentPage: data.currentPage, lastPage: data.lastPage, total: data.total, perPage: data.perPage },
    })),
    on(UserActions.load, (state, {}) => ({
      ...state,
      user: null,
    })),
    on(UserApiActions.loadSuccess, (state, { user }) => ({
      ...state,
      user,
    })),
    on(UserApiActions.loadCurrentSuccess, (state, { currentUser }) => ({
      ...state,
      currentUser,

    })),
    on(UserActions.sort, (state, { fromHighest }) => {
      const usersArray = [...state.users];
      return {...state,
      users: fromHighest ? usersArray.sort((a,b) => b.averageRating - a.averageRating) :
        usersArray.sort((a,b) => a.averageRating - b.averageRating),
    }}),
    on(UserApiActions.updateActiveStatusSuccess, (state, { user }) => ({
      ...state,
      users: state.users.map((oldUser) => user.id === oldUser.id ? user : oldUser),
    })),
    // on(CurrentUserApiActions.logoutSuccess, (state, {}) => ({
    //   ...state,
    //   currentUser: null,
    // })),
  )
});

export const {
  name,
  selectCurrentUser,
  selectRegisterSuccess,
  selectFailureMessage,
  selectUsers,
  selectUser,
  selectLearners,
  selectInactiveUser,
  selectFailure,
  selectPaginationInformation,
} = userFeature;
