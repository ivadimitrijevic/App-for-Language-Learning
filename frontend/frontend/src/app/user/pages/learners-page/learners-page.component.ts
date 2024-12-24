import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { UserActions } from '../../store/actions/user.actions';
import { Learner } from '../../utils/types/learner.type';
import {
  selectCurrentUser,
  selectLearners,
  selectPaginationInformation,
  selectUser
} from '../../store/reducers/user.reducer';
import { LearnerCardComponent } from '../components/learner-card/learner-card.component';
import { FriendActions } from '../../../friend/store/actions/friend.actions';
import { User } from '../../utils/types/user.type';
import { DetailedLearnerCardComponent } from '../components/detailed-learner-card/detailed-learner-card.component';
import { LanguageActions } from '../../../language/store/actions/language.actions';
import { Language } from '../../../language/utils/types/language.type';
import { selectKnownLanguages, selectLearningLanguages } from '../../../language/store/reducers/language.reducer';
import { SelectCityComponent } from '../../../city/component/select-city/select-city.component';
import { SelectLanguageComponent } from '../../../language/components/select-language/select-language.component';
import { RatingActions } from '../../../rating/store/actions/rating.actions';
import { Rating } from '../../../rating/utils/types/rating';
import { selectRatings } from '../../../rating/store/reducers/rating.reducer';
import { HeaderComponent } from '../../../header/components/header/header.component';
import { NotificationActions } from '../../../notifications/store/actions/notification.actions';
import { ConfirmationPopUpComponent } from '../../../messages-pop-up/confirmation-pop-up/confirmation-pop-up.component';
import { PaginationInformation } from '../../../pagination/utils/types/pagination-information.type';
import { Friend } from '../../../friend/utils/types/friend.type';
import { selectFriends } from '../../../friend/store/reducers/friend.reducer';

/**
 * LearnersPage component
 */
@Component({
  selector: 'app-learners-page',
  standalone: true,
  imports: [
    AsyncPipe,
    LearnerCardComponent,
    DetailedLearnerCardComponent,
    SelectCityComponent,
    SelectLanguageComponent,
    HeaderComponent,
    ConfirmationPopUpComponent
  ],
  templateUrl: './learners-page.component.html',
  styleUrl: './learners-page.component.scss'
})
export class LearnersPageComponent implements OnInit {
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
   * City
   * @type { string }
   */
  public city: string = '';
  /**
   * Country
   * @type { string }
   */
  public country: string = '';
  /**
   * Language
   * @type { string }
   */
  public language: string = '';
  /**
   * Subscription
   * @type { Subscription }
   */
  public subscription: Subscription;
  /**
   * Indicator whether detail pop-up is presented
   * @type { boolean }
   */
  public displayDetails: boolean = false;
  /**
   * Id of current user
   * @type { number }
   */
  public currentUserId: number;
  /**
   * Name and surname of current user
   * @type { number }
   */
  public currentUserName: string;
  /**
   * Indicator whether add friend button will be shown
   * @type { boolean }
   */
  public displayFriendshipButton: boolean;
  /**
   * Logged in user
   */
  public currentUser = JSON.parse(localStorage.getItem('currentUser'));
  /**
   * Observable of current user
   * @type { Observable<User> }
   */
  // public currentUser$: Observable<User> = this.store.select(selectCurrentUser);
  /**
   * Observable of array of learners
   * @type { Observable<Array<Learner>> }
   */
  public learners$: Observable<Array<Learner>> = this.store.select(selectLearners);
  /**
   * Observable of array of users friends
   * @type { Observable<Array<Friend>> }
   */
  public friends$: Observable<Array<Friend>> = this.store.select(selectFriends);
  /**
   * Observable of user
   * @type { Observable<User> }
   */
  public user$: Observable<User> = this.store.select(selectUser);
  /**
   * Observable of pagination information
   * @type { Observable<PaginationInformation> }
   */
  public paginationData$: Observable<PaginationInformation> = this.store.select(selectPaginationInformation);
  /**
   * Observable of known languages
   * @type { Observable<Array<Language>> }
   */
  public knownLanguages$: Observable<Array<Language>> = this.store.select(selectKnownLanguages);
  /**
   * Observable of learning languages
   * @type { Observable<Array<Language>> }
   */
  public learningLanguages$: Observable<Array<Language>> = this.store.select(selectLearningLanguages);
  /**
   * Observable of array of ratings
   * @type { Observable<Array<Rating>> }
   */
  public ratings$: Observable<Array<Rating>> = this.store.select(selectRatings);
  /**
   * Constructor of Learners-page
   * @param { Store } store
   */
  constructor(private store: Store) {
  }

  /**
   * OnInit method of Learners-page
   */
  ngOnInit(): void {
    // this.currentUser$.subscribe((currentUser) => {
    //   if (currentUser) {
        this.store.dispatch(UserActions.loadAll({ currentUserId: this.currentUser.id }));
        this.currentUserId = this.currentUser.id;
        this.currentUserName = this.currentUser.name + ' ' + this.currentUser.surname;
        this.store.dispatch(FriendActions.loadAll({ userId: this.currentUser.id }));
      // }
    // })
  }

  /**
   * Method for sending request to another user
   * @param { number } friendId
   */
  public sendRequest(friendId: number) {
    this.store.dispatch(FriendActions.create({ user: this.currentUserId, friend: friendId, active: false }));
    this.store.dispatch(NotificationActions.create({ fromUser: this.currentUserId, toUser: friendId, seen: false, notificationType: 'request', text: this.currentUserName + ' has sent friend request for you.'}))
    this.message = 'You have successfully sent friend request!';
    this.displayConfirmation = true;
  }

  /**
   * Method for opening pop-up with user details
   * @param { number } learnerId
   */
  public openDetails(learnerId: number) {
    this.store.dispatch(UserActions.load({ id: learnerId }));
    this.subscription = this.user$.subscribe((user) => {
      if (user) {
        this.store.dispatch(LanguageActions.loadAllKnown({ userId: user.id }));
        this.store.dispatch(LanguageActions.loadAllLearning({ userId: user.id }));
      }
    });
    this.friends$.subscribe((friends) => {
      if (friends) {
        this.displayFriendshipButton = !friends.find((friend) => (friend.user.id === this.currentUserId && friend.friend.id === learnerId) ||
          (friend.friend.id === this.currentUserId && friend.user.id === learnerId));
      }
    })
    this.displayDetails = true;
  }

  /**
   * Method for searching through learners
   */
  public searchLearners() {
    this.store.dispatch(UserActions.loadAll({ currentUserId: this.currentUserId, city: this.city, country: this.country, language: this.language }));
  }
  /**
   * Method for resetting filters
   */
  public resetLearners(){
    this.store.dispatch(UserActions.loadAll({ currentUserId: this.currentUserId }));
    this.city = '';
    this.country = '';
    this.language = '';
  }

  /**
   * Method for loading comments
   * @param { number } userId
   */
  public loadComments(userId: number) {
    this.store.dispatch(RatingActions.loadAll({ userId }));
  }

  /**
   * Method for changing page
   * @param { number } page
   */
  public changePage(page: number) {
    this.store.dispatch(UserActions.loadAll({ currentUserId: this.currentUserId, city: this.city, country: this.country, language: this.language, page: page }));
  }
}
