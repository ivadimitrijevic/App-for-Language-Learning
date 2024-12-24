import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { SelectLanguageComponent } from '../../../language/components/select-language/select-language.component';
import { SelectCityComponent } from '../../../city/component/select-city/select-city.component';
import { EventActions } from '../../store/actions/event.actions';
import { User } from '../../../user/utils/types/user.type';
import { ConfirmationPopUpComponent } from '../../../messages-pop-up/confirmation-pop-up/confirmation-pop-up.component';

/**
 * CreateEvent component
 */
@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    SelectLanguageComponent,
    SelectCityComponent,
    FormsModule,
    ConfirmationPopUpComponent
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {
  public language: string = '';
  public city: string = '';
  public country: string = '';
  public description: string = '';
  public address: string = '';
  public name: string = '';
  public time: string = '';
  public date: Date = null;
  public maxPeople: number = 0;
  public picture: string;
  /**
   * Current user
   * @type { User }
   */
  @Input() currentUser: User;
  /**
   * Emit to parent component when closing
   */
  @Output() closingAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Constructor of create-event component
   * @param { Store } store
   */
  constructor(private store: Store) {
  }

  /**
   * Method for setting city and country
   * @param data
   */
  public selectCity(data: { city: string, country: string}) {
    this.city = data.city;
    this.country = data.country;
  }

  /**
   * Method for creating event
   */
  public createEvent() {
    this.store.dispatch(EventActions.create({
      eventMaker: 3,
      name: this.name,
      description: this.description,
      maxPeople: this.maxPeople,
      date: this.date,
      time: this.time,
      city: this.city,
      country: this.country,
      address: this.address,
      language: this.language,
    }));
    this.closingAction.emit(true);
  }
}
