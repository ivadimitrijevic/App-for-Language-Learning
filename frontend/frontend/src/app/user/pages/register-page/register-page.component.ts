import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf } from '@angular/common';

import { map } from 'rxjs/operators';
import { catchError, Observable, of } from 'rxjs';

import { Store } from '@ngrx/store';

import { RoleEnum } from '../../utils/enums/role.enum';
import { GenderEnum } from '../../utils/enums/gender.enum';
import { CityService } from '../../../city/services/city.service';
import { UserActions } from '../../store/actions/user.actions';

/**
 * RegisterPage component
 */
@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  /**
   * GenderEnum
   * @protected
   */
  protected readonly GenderEnum = GenderEnum;
  /**
   * Indicator whether drop down is visible
   * @type { boolean }
   */
  public showDropdown: boolean;
  /**
   * Indicator whether drop down with genders is visible
   * @type { boolean }
   */
  public showGender: boolean;
  /**
   * Name
   * @type { string }
   */
  public name: string = '';
  /**
   * Surname
   * @type { string }
   */
  public surname: string = '';
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
   * Description
   * @type { string }
   */
  public description: string = '';
  /**
   * Picture
   * @type { string }
   */
  public picture: string = '';
  /**
   * Age
   * @type { number }
   */
  public age: number;
  /**
   * Phone number
   * @type { string }
   */
  public phoneNumber: string = '';
  /**
   * Active
   * @type { boolean }
   */
  public active: boolean = true;
  /**
   * Role
   * @type { RoleEnum }
   */
  public role: RoleEnum = RoleEnum.LEARNER;
  /**
   * Gender
   * @type { GenderEnum }
   */
  public gender: GenderEnum;
  /**
   * Gender name
   * @type { string }
   */
  public genderName: string;
  /**
   * Email
   * @type { string }
   */
  public email: string = '';
  /**
   * Password
   * @type { string }
   */
  public password: string = '';
  /**
   * Observable of cities
   * @type { Observable<any> }
   */
  cities$: Observable<any> = of([]);
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
   * Method for registering
   */
  public register() {
    this.store.dispatch(UserActions.register({
      name: this.name,
      surname: this.surname,
      age: this.age,
      gender: this.gender,
      role: this.role.valueOf(),
      city: this.city,
      country: this.country,
      picture: this.picture,
      description: this.description,
      phoneNumber: this.phoneNumber,
      active: this.active,
      email: this.email,
      password: this.password }));
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
    this.country = city.country;
  }

  /**
   * Method for closing drop down on outside click
   */
  @HostListener('document:click')
  closeDropdown(): void {
    this.showDropdown = false;
  }
}
