import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { HeaderComponent } from '../../../header/components/header/header.component';
import { UserActions } from '../../store/actions/user.actions';
import { selectPaginationInformation, selectUsers } from '../../store/reducers/user.reducer';
import { LearnerCardComponent } from '../components/learner-card/learner-card.component';
import { AdminUserCardComponent } from '../components/admin-user-card/admin-user-card.component';
import { User } from '../../utils/types/user.type';
import { ConfirmationPopUpComponent } from '../../../messages-pop-up/confirmation-pop-up/confirmation-pop-up.component';
import { PaginationInformation } from '../../../pagination/utils/types/pagination-information.type';

/**
 * Users page
 */
@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    AsyncPipe,
    HeaderComponent,
    LearnerCardComponent,
    AdminUserCardComponent,
    MatSlideToggleModule,
    FormsModule,
    ConfirmationPopUpComponent
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent implements OnInit {
  /**
   * Indicator whether confirmation pop up is displayed
   * @type { boolean }
   */
  public displayConfirmation: boolean = false;
  /**
   * Message
   * @type { string }
   */
  public message: string;
  /**
   * Sort from highest
   */
  public fromHighest: boolean = true;
  /**
   * Search term
   * @type { string }
   */
  public searchTerm: string = '';
  /**
   * Indicator whether only active users are shown
   * @type { boolean }
   */
  public onlyActive: boolean = false;
  /**
   * Observable of users
   * @type { Observable<Array<User>> }
   */
  public users$: Observable<Array<User>> = this.store.select(selectUsers);
  /**
   * Observable of pagination information
   * @type { Observable<PaginationInformation> }
   */
  public paginationData$: Observable<PaginationInformation> = this.store.select(selectPaginationInformation);

  /**
   * Constructor of users-page component
   * @param { Store } store
   */
  constructor(private store: Store) {
  }

  /**
   * OnInit method of users-page component
   */
  ngOnInit(): void {
    this.store.dispatch(UserActions.loadAllAdmin({}));
  }

  /**
   * Method for sorting users
   */
  public sortUsers() {
    this.store.dispatch(UserActions.sort({ fromHighest: this.fromHighest }));
    this.fromHighest = !this.fromHighest;
  }

  /**
   * Method for searching users
   */
  public search() {
    this.store.dispatch(UserActions.loadAllAdmin({ term: this.searchTerm, onlyActive: this.onlyActive }));
  }

  /**
   * Method for toggling users
   */
  public toggleUsers() {
    this.store.dispatch(UserActions.loadAllAdmin({ term: this.searchTerm, onlyActive: this.onlyActive }));
  }

  /**
   * Method for updating active attribute of user
   * @param { boolean } active
   * @param { number } userId
   */
  public updateUser(active: boolean, userId: number) {
    this.store.dispatch(UserActions.updateActiveStatus({ userId, active }));
    this.message = active ? 'You have successfully returned back user!' : 'You have successfully removed user!';
      this.displayConfirmation = true;
  }

  /**
   * Method for changing page
   * @param { number } page
   */
  public changePage(page: number) {
    this.store.dispatch(UserActions.loadAllAdmin({ term: this.searchTerm, onlyActive: this.onlyActive, page: page }));
  }
}
