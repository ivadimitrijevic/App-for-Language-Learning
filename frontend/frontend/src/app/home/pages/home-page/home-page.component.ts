import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { FriendActions } from '../../../friend/store/actions/friend.actions';
import { User } from '../../../user/utils/types/user.type';
import { selectCurrentUser } from '../../../user/store/reducers/user.reducer';
import { Friend } from '../../../friend/utils/types/friend.type';
import { selectFriends } from '../../../friend/store/reducers/friend.reducer';
import { FriendsComponent } from '../../../friend/components/friends/friends.component';
import { LeaveRatingComponent } from '../../../rating/components/leave-rating/leave-rating.component';
import { RatingActions } from '../../../rating/store/actions/rating.actions';
import { HeaderComponent } from '../../../header/components/header/header.component';
import { UserEventsComponent } from '../../components/user-events/user-events.component';
import { EventActions } from '../../../event/store/actions/event.actions';
import { Event } from '../../../event/utils/types/event.type';
import { selectParticipants, selectUserEvents } from '../../../event/store/reducers/event.reducer';
import {
  DetailedEventCardComponent
} from '../../../event/components/detailed-event-card/detailed-event-card.component';
import { EditEventComponent } from '../../../event/components/edit-event/edit-event.component';
import { ConfirmationPopUpComponent } from '../../../messages-pop-up/confirmation-pop-up/confirmation-pop-up.component';

/**
 * HomePage component
 */
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    FriendsComponent,
    AsyncPipe,
    LeaveRatingComponent,
    HeaderComponent,
    UserEventsComponent,
    DetailedEventCardComponent,
    EditEventComponent,
    ConfirmationPopUpComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
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
   * Selected user
   * @type { User }
   */
  public selectedUser: User;
  /**
   * Indicator whether review pop up is presented
   * @type { boolean }
   */
  public displayReview: boolean = false;
  /**
   * Indicator whether edit component is visible
   * @type { boolean }
   */
  public displayEdit: boolean = false;
  /**
   * Selected event
   * @type { Event }
   */
  public selectedEvent: Event;
  /**
   * Logged in user
   */
  public savedUser = JSON.parse(localStorage.getItem('currentUser'));
  /**
   * Indicator whether detailed pop up is displayed
   * @type { boolean }
   */
  public displayEventDetails: boolean = false;
  /**
   * Subscription
   * @type { Subscription }
   */
  public subscription: Subscription;
  /**
   * Observable of an array of friends
   * @type { Observable<Array<Friend>> }
   */
  public friends$: Observable<Array<Friend>> = this.store.select(selectFriends);
  /**
   * Observable of user's events
   * @type { Observable<Array<Event>> }
   */
  public userEvents$: Observable<Array<Event>> = this.store.select(selectUserEvents);
  /**
   * Observable of participants in event
   * @type { Observable<Array<User>> }
   */
  public participants$: Observable<Array<User>> = this.store.select(selectParticipants);

  /**
   * Constructor of home-page component
   * @param store
   */
  constructor(private store: Store) {
  }
  /**
   * OnInit method of home-page component
   */
  ngOnInit(): void {
    this.store.dispatch(FriendActions.loadAll({ userId: this.savedUser.id }));
    this.store.dispatch(EventActions.loadUserEvents({ userId: this.savedUser.id }));
  }

  /**
   * Method for opening review pop-up
   * @param { User } user
   */
  public openReview(user: User) {
    this.selectedUser = user;
    this.displayReview = true;
  }

  /**
   * Method for leaving review
   * @param { text?: string, rating: number, friendId: number } data
   * @param { number } userId
   */
  public leaveRating(data: { text?: string, rating: number, friendId: number }, userId: number) {
    this.store.dispatch(RatingActions.create({
      fromUser: userId,
      toUser: data.friendId,
      text: data.text,
      rating: data.rating
    }));
    this.displayReview = false;
    this.message = 'You have successfully left rating!';
    this.displayConfirmation = true;
  }

  /**
   * Method for opening event info
   * @param data
   * @param { User } user
   */
  public openEvent(data: { event: Event }, user: User) {
    this.selectedEvent = data.event;
    this.displayEventDetails = true;
    this.store.dispatch(EventActions.loadUserEvents({ userId: user.id }));
    this.store.dispatch(EventActions.loadEventUsers({ eventId: data.event.id }));
  }

  /**
   * Method for leaving event
   * @param { User } user
   */
  public leaveEvent(user: User) {
    this.store.dispatch(EventActions.removeFromEvent({ user: user, eventId: this.selectedEvent.id }));
  }
}
