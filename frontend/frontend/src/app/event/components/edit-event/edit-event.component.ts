import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Event } from '../../utils/types/event.type';
import { SelectCityComponent } from '../../../city/component/select-city/select-city.component';
import { SelectLanguageComponent } from '../../../language/components/select-language/select-language.component';
import { EventActions } from '../../store/actions/event.actions';

/**
 * EditEvent component
 */
@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SelectCityComponent,
    SelectLanguageComponent,
    FormsModule
  ],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.scss'
})
export class EditEventComponent implements OnInit {
  public language: string;
  public city: string;
  public country: string;
  public description: string;
  public address: string;
  public name: string;
  public time: string;
  public date: Date;
  public maxPeople: number;
  public picture: string;
  /**
   * Event
   * @type { Event }
   */
  @Input() event: Event
  /**
   * Emit to parent component when closing
   * @type { EventEmitter<void> }
   */
  @Output() closingAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Constructor of edit-event component
   * @param { Store } store
   */
  constructor(private store: Store) {
  }

  /**
   * OnInit method of edit-event component
   */
  ngOnInit(): void {
    this.city = this.event.city;
    this.country = this.event.country;
    this.address = this.event.address;
    this.date = this.event.date;
    this.time = this.event.time;
    this.picture = this.event.picture;
    this.name = this.event.name;
    this.description = this.event.description;
    this.language = this.event.language;
    this.maxPeople = this.event.maxPeople;
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
   * Method for updating event
   */
  public updateEvent() {
    this.store.dispatch(EventActions.update({
      id: this.event.id,
      eventMaker: this.event.eventMaker.id,
      name: this.name,
      description: this.description,
      city: this.city,
      country: this.country,
      address: this.address,
      language: this.language,
      date: this.date,
      time: this.time,
      maxPeople: this.maxPeople,
      picture: this.picture
    }));
    this.closingAction.emit(true);
  }

}
