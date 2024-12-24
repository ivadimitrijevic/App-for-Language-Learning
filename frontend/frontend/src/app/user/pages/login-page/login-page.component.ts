import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { UserActions } from '../../store/actions/user.actions';
import { selectFailure, selectInactiveUser } from '../../store/reducers/user.reducer';
import { ErrorPopUpComponent } from '../../../messages-pop-up/error-pop-up/error-pop-up.component';

/**
 * LoginPage component
 */
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    ErrorPopUpComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  /**
   * Indicator whether error message is displayed
   * @type { boolean }
   */
  public displayError: boolean = false;
  /**
   * Message
   * @type { boolean }
   */
  public message: string;
  /**
   * Email
   * @type { string }
   */
  public email: string;
  /**
   * Password
   * @type { string }
   */
  public password: string;
  /**
   * Observable of indicator whether user has active status
   * @type { Observable<boolean> }
   */
  public inactiveUser$: Observable<boolean> = this.store.select(selectInactiveUser);
  /**
   * Observable of indicator whether login was unsuccessful
   * @type { Observable<boolean> }
   */
  public failure$: Observable<boolean> = this.store.select(selectFailure);

  /**
   * Constructor for LoginPage component
   * @param store
   * @param router
   */
  constructor(
    private store: Store,
    private router: Router,
  ) {
  }

  /**
   * Method for logging in
   */
  public login() {
    if (this.email && this.password) {
      this.store.dispatch(UserActions.login({email: this.email, password: this.password}));
      this.inactiveUser$.subscribe((inactiveUser) => {
        if (inactiveUser) {
          this.message = 'Unfortunately, you are banned from this app and can not longer use it.'
          this.displayError = true;
        }
      });
      this.failure$.subscribe((failure) => {
        if (failure) {
          this.message = 'Email or password is incorrect.'
          this.displayError = true;
        }
      })
    }
    else {
      this.message = 'You must enter both email and password!'
      this.displayError = true;
    }
  }

  /**
   * Method for navigating to register page
   */
  public navigate() {
    this.router.navigate(['/register']);
  }
}
