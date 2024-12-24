import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";

import { Observable, of, switchMap } from "rxjs";
import { map } from "rxjs/operators";

import { UserService } from '../../services/user.service';
import { UserActions } from '../actions/user.actions';
import { UserApiActions } from '../actions/user-api.actions';
import { User } from '../../utils/types/user.type';

/**
 * CurrentUser Effect
 */
@Injectable()
export class UserEffects {
  /**
   * Constructor for User effect
   * @param actions$
   * @param userService
   * @param router
   */
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
  ){}

  /**
   * Effect for logging in
   * dispatched when 'login' action is triggered
   * @type { Observable<Action> }
   */
  login$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.login.type),
      switchMap(({ email, password }) =>
        this.userService.login(email, password).pipe(
          switchMap((data: any) => {
            if (data && data.user) {
              localStorage.setItem('currentUser', JSON.stringify(data.user));
              localStorage.setItem('selectedPage','/home');
              if (data.user.active) {
                if (data.user.role.id === 2) {
                  this.router.navigate(['/home']);
                } else {
                  this.router.navigate(['/users']);
                }
              }
              return of(UserApiActions.loginSuccess({ user: data.user }));
            } else {
              return of(UserApiActions.loginFailure({ message: 'Email or password are incorrect!' }));
            }
          })
        )
      )
    );
  });

  /**
   * Effect for registering
   * dispatched when 'register' action is triggered
   * @type { Observable<Action> }
   */
  register$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(UserActions.register.type),
    switchMap(({
       name,
       surname,
       gender,
       city,
       country,
       role,
       email,
       password,
       active,
       description,
       picture,
       phoneNumber,
       age,
     }) => this.userService.register(
      name,
      surname,
      gender,
      city,
      country,
      role,
      email,
      password,
      active,
      description,
      picture,
      phoneNumber,
      age,
    ).pipe(
      map((user: User) => {
        this.router.navigate(['/login']);
        return UserApiActions.registerSuccess({user})
      })
    ))
  )});

  /**
   * Effect for getting user's information
   * dispatched when 'load' action is dispatched
   * @type { Observable<Action> }
   */
  load$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(UserActions.load.type),
    switchMap(({ id }) => this.userService.getUser(id).pipe(
      map((data: any) => UserApiActions.loadSuccess({ user: data.user }))
    ))
  )});

  /**
   * Effect for getting all users information
   * dispatched when 'loadAll' action is dispatched
   * @type { Observable<Action> }
   */
  loadAll$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(UserActions.loadAll.type),
    switchMap(({ currentUserId, city, country, language, page }) => this.userService.getAll(currentUserId, city, country, language, page).pipe(
      map((data: any) => UserApiActions.loadAllSuccess({ data }))
    ))
  )});

  /**
   * Effect for getting all users information for admin
   * dispatched when 'loadAllAdmin' action is dispatched
   * @type { Observable<Action> }
   */
  loadAllAdmin$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(UserActions.loadAllAdmin.type),
    switchMap(({ term, onlyActive, page }) => this.userService.getAllUsers(term, onlyActive, page).pipe(
      map((data: any) => UserApiActions.loadAllAdminSuccess({ data }))
    ))
  )});

  /**
   * Effect for updating user's information
   * dispatched when 'update' action is dispatched
   * @type { Observable<Action> }
   */
  update$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(UserActions.update.type),
    switchMap(({ userId,
                         name,
                         surname,
                         age,
                         gender,
                         phoneNumber,
                         description,
                         picture,
                         city,
                         country
    }) => {
      return this.userService.updateUser(userId,
        name,
        surname,
        age,
        gender,
        phoneNumber,
        description,
        picture,
        city,
        country).pipe(
        map((user: User) => UserApiActions.updateSuccess({ user }))
      )
    })
  )});

  /**
   * Effect for updating user's active attribute
   * dispatched when 'updateActiveStatus' action is dispatched
   * @type { Observable<Action> }
   */
  updateActiveStatus$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
    ofType(UserActions.updateActiveStatus.type),
    switchMap(({ userId, active }) => {
      return this.userService.updateActiveStatus(userId, active).pipe(
        map((user: User) => UserApiActions.updateActiveStatusSuccess({ user }))
      )
    })
  )});
  //
  // /**
  //  * Effect for getting user's information
  //  * dispatched when 'logout' action is dispatched
  //  * @type { Observable<Action> }
  //  */
  // logout$: Observable<Action> = createEffect(() => { return this.actions$.pipe(
  //   ofType(CurrentUserActions.logout.type),
  //   map(() => {
  //     this.router.navigate(['/login']);
  //     return CurrentUserApiActions.logoutSuccess();
  //   })
  // )});
}
