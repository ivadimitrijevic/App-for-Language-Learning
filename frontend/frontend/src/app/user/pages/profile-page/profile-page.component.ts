import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Language } from '../../../language/utils/types/language.type';
import { selectKnownLanguages, selectLearningLanguages } from '../../../language/store/reducers/language.reducer';
import { LanguageActions } from '../../../language/store/actions/language.actions';
import {
  LanguagesComponentComponent
} from '../../../language/components/languages-component/languages-component.component';
import { UserPicturePlaceholderPipe } from '../../pipes/user-picture-placeholder.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenderEnum } from '../../utils/enums/gender.enum';
import { SelectCityComponent } from '../../../city/component/select-city/select-city.component';
import { UserActions } from '../../store/actions/user.actions';
import { HeaderComponent } from '../../../header/components/header/header.component';
import { ConfirmationPopUpComponent } from '../../../messages-pop-up/confirmation-pop-up/confirmation-pop-up.component';
import { User } from '../../utils/types/user.type';
import { selectCurrentUser } from '../../store/reducers/user.reducer';

/**
 * ProfilePage component
 */
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    AsyncPipe,
    LanguagesComponentComponent,
    UserPicturePlaceholderPipe,
    ReactiveFormsModule,
    FormsModule,
    SelectCityComponent,
    HeaderComponent,
    ConfirmationPopUpComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  /**
   * Gender enum
   * @protected
   */
  protected readonly GenderEnum = GenderEnum;
  /**
   * Indicator whether gender dropdown is displayed
   * @type { boolean }
   */
  public showGender: boolean;
  /**
   * Gender name
   * @type { string }
   */
  public genderName: string;
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
   * User id
   * @type { number }
   */
  public userId: number;
  /**
   * Indicator if page is in edit mode
   * @type { boolean }
   */
  public editMode: boolean = false;
  /**
   * Name
   * @type { string }
   */
  public name: string = '';
  /**
   * Surname
   * @type { string }
   */
  public surname: string;
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
   * Gender
   * @type { GenderEnum }
   */
  public gender: GenderEnum;
  /**
   * Logged in user
   */
  public currentUser = JSON.parse(localStorage.getItem('currentUser'));
  /**
   * Observable of an array of known languages of user
   * @type { Observable<Array<Language>> }
   */
  public knownLanguages$: Observable<Array<Language>> = this.store.select(selectKnownLanguages);
  /**
   * Observable of an array of learning languages of user
   * @type { Observable<Array<Language>> }
   */
  public learningLanguages$: Observable<Array<Language>> = this.store.select(selectLearningLanguages);
  /**
   * Observable of current user
   * @type { Observable<User> }
   */
  public currentUser$: Observable<User> = this.store.select(selectCurrentUser);

  /**
   * Constructor of Profile page
   * @param store
   */
  constructor(
    private store: Store
  ) {
  }

  /**
   * OnInit method of ProfilePage component
   */
  ngOnInit(): void {
    this.store.dispatch(UserActions.loadCurrent({ id: this.currentUser.id }))
    this.store.dispatch(LanguageActions.loadAllKnown({ userId: this.currentUser.id }));
    this.store.dispatch(LanguageActions.loadAllLearning({ userId: this.currentUser.id }));
    this.currentUser$.subscribe((currentUser: User) => {
      this.userId = currentUser.id;
      this.name = currentUser.name;
      this.surname = currentUser.surname;
      this.age = currentUser.age;
      this.city = currentUser.city;
      this.country = currentUser.country;
      this.gender = currentUser.gender.id;
      this.genderName = currentUser.gender.name;
      this.phoneNumber = currentUser.phoneNumber;
      this.description = currentUser.description;
      this.picture = currentUser.picture;
    })
  }

  /**
   * Method for updating user information
   */
  public updateUser() {
    this.editMode = false;
    this.store.dispatch(UserActions.update({
      userId: this.userId,
      name: this.name,
      surname: this.surname,
      age: this.age,
      city: this.city,
      country: this.country,
      gender: this.gender,
      phoneNumber: this.phoneNumber,
      description: this.description,
      picture: this.picture,
    }))
    this.message = 'You have successfully updated your information!';
    this.displayConfirmation = true;
  }
}
