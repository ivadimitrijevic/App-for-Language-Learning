import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { HeaderComponent } from '../../../header/components/header/header.component';
import { SelectCityComponent } from '../../../city/component/select-city/select-city.component';
import { SelectLanguageComponent } from '../../../language/components/select-language/select-language.component';
import { User } from '../../../user/utils/types/user.type';
import { Event } from '../../utils/types/event.type';
import {
  selectEvents,
  selectPaginationInformation,
  selectParticipants,
  selectUserEvents
} from '../../store/reducers/event.reducer';
import { EventActions } from '../../store/actions/event.actions';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { DetailedEventCardComponent } from '../../components/detailed-event-card/detailed-event-card.component';
import { CreateEventComponent } from '../../components/create-event/create-event.component';
import { EditEventComponent } from '../../components/edit-event/edit-event.component';
import { ConfirmationPopUpComponent } from '../../../messages-pop-up/confirmation-pop-up/confirmation-pop-up.component';
import { PaginationInformation } from '../../../pagination/utils/types/pagination-information.type';

/**
 *EventsPage component
 */
@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [
    AsyncPipe,
    HeaderComponent,
    SelectCityComponent,
    SelectLanguageComponent,
    EventCardComponent,
    DetailedEventCardComponent,
    FormsModule,
    CreateEventComponent,
    EditEventComponent,
    ConfirmationPopUpComponent
  ],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.scss'
})
export class EventsPageComponent implements OnInit {
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
   * Date
   * @type { Date }
   */
  public date: Date;
  /**
   * Selected event
   * @type { Event }
   */
  public selectedEvent: Event;
  /**
   * Indicator whether detailed pop up is displayed
   * @type { boolean }
   */
  public displayEventDetails: boolean = false;
  /**
   * Indicator whether create component is displayed
   * @type { boolean }
   */
  public displayCreate: boolean = false;
  /**
   * Indicator whether edit component is visible
   * @type { boolean }
   */
  public displayEdit: boolean = false;
  /**
   * Logged in user
   */
  public currentUser = JSON.parse(localStorage.getItem('currentUser'));
  /**
   * Observable of pagination information
   * @type { Observable<PaginationInformation> }
   */
  public paginationData$: Observable<PaginationInformation> = this.store.select(selectPaginationInformation);
  /**
   * Observable of events
   * @type { Observable<Event> }
   */
  public events$: Observable<Array<Event>> = this.store.select(selectEvents);
  /**
   * Observable of user's events
   * @type { Observable<Array<Event>> }
   */
  public usersEvents$: Observable<Array<Event>> = this.store.select(selectUserEvents);
  /**
   * Observable of participants in event
   * @type { Observable<Array<User>> }
   */
  public participants$: Observable<Array<User>> = this.store.select(selectParticipants);
  /**
   * Constructor of Learners-page
   * @param { Store } store
   */
  constructor(private store: Store) {
  }

  /**
   * OnInit method of events-page component
   */
  ngOnInit(): void {
    this.store.dispatch(EventActions.loadAll({}));
  }

  /**
   * Method for searching through events
   */
  public searchEvents() {
    this.store.dispatch(EventActions.loadAll({ city: this.city, country: this.country, language: this.language, date: this.date }));
  }

  /**
   * Method for resetting filters
   */
  public resetEvents() {
    this.store.dispatch(EventActions.loadAll({}));
    this.city = '';
    this.country = '';
    this.language = null;
    this.date = null;
  }

  /**
   * Method for opening event info
   * @param { Event } event
   * @param { User } user
   */
  public openEvent(event: Event, user: User) {
    this.selectedEvent = event;
    this.displayEventDetails = true;
    this.store.dispatch(EventActions.loadUserEvents({ userId: user.id }));
    this.store.dispatch(EventActions.loadEventUsers({ eventId: event.id }));
  }

  /**
   * Method for joining event
   * @param { User } user
   */
  public joinEvent(user: User) {
    this.store.dispatch(EventActions.registerForEvent({ user: user, event: this.selectedEvent }));
    this.message = 'You have successfully joined an Event!';
    this.displayConfirmation = true;
  }

  /**
   * Method for leaving event
   * @param { User } user
   */
  public leaveEvent(user: User) {
    this.store.dispatch(EventActions.removeFromEvent({ user: user, eventId: this.selectedEvent.id }));
    this.message = 'You have successfully left an Event!';
    this.displayConfirmation = true;
  }

  /**
   * Method for closing creating pop up
   * @param created
   */
  public closeCreatePopUp(created: boolean) {
    this.displayCreate = false;
    if (created) {
      this.message = 'You have successfully created new Event!';
      this.displayConfirmation = true;
    }
  }

  /**
   * Method for closing editing pop up
   * @param edited
   */
  public closeEditPopUp(edited: boolean) {
    this.displayEdit = false;
    if (edited) {
      this.message = 'You have successfully updated Event!';
      this.displayConfirmation = true;
    }
  }

  /**
   * Method for changing page
   * @param { number } page
   */
  public changePage(page: number) {
    this.store.dispatch(EventActions.loadAll({ city: this.city, country: this.country, language: this.language, date: this.date, page: page }));
  }
}
