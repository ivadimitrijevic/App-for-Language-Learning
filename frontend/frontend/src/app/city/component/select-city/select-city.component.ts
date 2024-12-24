import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CityService } from '../../services/city.service';

/**
 * SelectCity component
 */
@Component({
  selector: 'app-select-city',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './select-city.component.html',
  styleUrl: './select-city.component.scss'
})
export class SelectCityComponent {
  /**
   * City
   * @type { string }
   */
  // public city: string = '';
  /**
   * Indicator whether drop down is visible
   * @type { boolean }
   */
  public showDropdown: boolean;
  /**
   * Observable of cities
   * @type { Observable<any> }
   */
  cities$: Observable<any> = of([]);
  /**
   * City
   * @type { string }
   */
  @Input() city: string;
  @Input() placeholder: string
  /**
   * Emit to parent component when city is selected
   */
  @Output() selectedCity: EventEmitter<string> = new EventEmitter<string>();
  /**
   * Emit to parent component when country is selected
   */
  @Output() selectedCountry: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectedCityAndCountry: EventEmitter<{ city: string, country: string }> = new EventEmitter<{ city: string, country: string }>();
  /**
   * Constructor for RegisterPage component
   * @param store
   * @param cityService
   */
  constructor(
    private store: Store,
    private cityService: CityService,
  ) {
  }
  /**
   * Method for searching cities
   * @param event
   */
  public onSearch(event: any) {
    this.showDropdown = true;
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.cities$ = this.cityService.searchCities(value).pipe(
      map(response => response.data),
      catchError(() => of([]))
    );
  }

  /**
   * Method for selecting city
   * @param city
   */
  public selectCity(city: any) {
    this.showDropdown = false;
    this.city = city.name;
    this.selectedCity.emit(city.name);
    this.selectedCountry.emit(city.country);
    this.selectedCityAndCountry.emit({ city: city.name, country: city.country });
    // this.country = city.country;
  }

  /**
   * Method for closing drop down on outside click
   */
  @HostListener('document:click')
  closeDropdown(): void {
    this.showDropdown = false;
  }
}
