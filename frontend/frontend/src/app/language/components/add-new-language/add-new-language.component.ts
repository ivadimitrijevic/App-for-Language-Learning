import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { User } from '../../../user/utils/types/user.type';
import { selectCurrentUser } from '../../../user/store/reducers/user.reducer';
import { LanguageLevel } from '../../utils/types/language-level.type';
import { selectLevels } from '../../store/reducers/language-level.reducer';
import { LanguageLevelActions } from '../../store/actions/language-level.actions';
import { TypeOfLearningActions } from '../../store/actions/type-of-learning.actions';
import { TypeOfLearning } from '../../utils/types/type-of-learning.type';
import { selectTypes } from '../../store/reducers/type-of-learning.reducer';
import { LanguageActions } from '../../store/actions/language.actions';
import { SelectLanguageComponent } from '../select-language/select-language.component';

/**
 * AddNewLanguage component
 */
@Component({
  selector: 'app-add-new-language',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    SelectLanguageComponent
  ],
  templateUrl: './add-new-language.component.html',
  styleUrl: './add-new-language.component.scss'
})
export class AddNewLanguageComponent implements OnInit {
  /**
   * Indicator whether level dropdown is displayed
   * @type { boolean }
   */
  public showLevel: boolean;
  /**
   * Language name
   * @type { string }
   */
  public name: string;
  /**
   * Id of language level
   * @type { number }
   */
  public levelId: number;
  /**
   * Name of language level
   * @type { number }
   */
  public levelName: string;
  /**
   * Array of selected types of learning
   * @type { Array<number> }
   */
  public selectedTypes: Array<number> = [];
  /**
   * Observable of user
   * @type { Observable<User> }
   */
  public user$: Observable<User> = this.store.select(selectCurrentUser);
  /**
   * Observable of array of language levels
   * @type { Observable<Array<LanguageLevel>> }
   */
  public levels$: Observable<Array<LanguageLevel>> = this.store.select(selectLevels);
  /**
   * Observable of an array of types of learning a language
   * @type { Observable<Array<TypeOfLearning>> }
   */
  public types$: Observable<Array<TypeOfLearning>> = this.store.select(selectTypes);
  /**
   * Indicator whether user is adding known or learning language
   * @type { boolean }
   */
  @Input() know: boolean;
  /**
   * Emit to parent component when component is closed
   * @type { EventEmitter<void> }
   */
  @Output() closingAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Constructor of AddNewLanguage component
   * @param { Store } store
   */
  constructor(private store:  Store,
              ) {
  }

  /**
   * OnInit method of  AddNewLanguage component
   */
  ngOnInit(): void {
    this.store.dispatch(LanguageLevelActions.loadAll());
    this.store.dispatch(TypeOfLearningActions.loadAll());
  }

  /**
   * Method for adding types of learning
   * @param { number } id
   */
  public addType(id: number) {
    if (this.selectedTypes.find((typeId) => typeId === id)) {
      this.selectedTypes = this.selectedTypes.filter((typeId) => typeId !== id);
    } else {
      this.selectedTypes[this.selectedTypes.length] = id;
    }
  }

  /**
   * Method for adding language
   * @param { number } userId
   */
  public addLanguage(userId: number) {
    this.store.dispatch(LanguageActions.create({
      name: this.name,
      userId: userId,
      levelId: this.levelId,
      know: this.know,
      types: this.selectedTypes
    }));
    this.closingAction.emit(true);
  }
}
