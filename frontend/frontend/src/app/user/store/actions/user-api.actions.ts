import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../utils/types/user.type';
import { Learner } from '../../utils/types/learner.type';

/**
 * UserApi Actions
 */
export const UserApiActions = createActionGroup({
  source: 'User/API',
  events: {
    loginSuccess: props<{ user: User }>(),
    loginFailure: props<{ message: string }>(),
    registerSuccess: props<{ user: User }>(),
    loadSuccess: props<{ user: User }>(),
    loadAllSuccess: props<{ data: any }>(),
    updateSuccess: props<{ user: User }>(),
    loadAllAdminSuccess: props<{ data: any }>(),
    sortSuccess: props<{ users: Array<User> }>(),
    updateActiveStatusSuccess: props<{ user: User }>(),
    // logoutSuccess: emptyProps(),
  }
})
