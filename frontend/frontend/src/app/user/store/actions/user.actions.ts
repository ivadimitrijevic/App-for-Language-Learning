import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../utils/types/user.type';

/**
 * User Actions
 */
export const UserActions = createActionGroup({
  source: 'User',
  events: {
    login: props<{ email: string, password: string }>(),
    register: props<{
      name: string,
      surname: string,
      gender: number,
      city: string,
      country: string,
      role: number,
      email: string,
      password: string,
      active: boolean,
      description?: string,
      picture?: string,
      phoneNumber?: string,
      age?: number,
    }>(),
    load: props<{ id: number }>(),
    loadCurrent: props<{ id: number }>(),
    loadAll: props<{ currentUserId: number; city?: string, country?: string, language?: string, page?: number }>(),
    update: props<{
      userId: number,
      name: string,
      surname: string,
      age: number,
      gender: number,
      phoneNumber: string,
      description: string,
      picture: string,
      city: string,
      country: string
    }>(),
    loadAllAdmin: props<{ term?: string; onlyActive?: boolean, page?: number }>(),
    sort: props<{ fromHighest: boolean }>(),
    updateActiveStatus: props<{ userId: number, active: boolean }>(),
    // logout: emptyProps(),
  }
})
