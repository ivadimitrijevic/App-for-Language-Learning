import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Language } from '../../utils/types/language.type';
import { LanguageLevel } from '../../utils/types/language-level.type';
import { selectLevels } from '../../store/reducers/language-level.reducer';
import { TypeOfLearning } from '../../utils/types/type-of-learning.type';
import { selectTypes } from '../../store/reducers/type-of-learning.reducer';
import { LanguageLevelActions } from '../../store/actions/language-level.actions';
import { TypeOfLearningActions } from '../../store/actions/type-of-learning.actions';
import { LanguageActions } from '../../store/actions/language.actions';

/**
 * EditLanguage component
 */
@Component({
  selector: 'app-edit-language',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './edit-language.component.html',
  styleUrl: './edit-language.component.scss'
})
export class EditLanguageComponent implements OnInit {
  /**
   * Indicator whether level dropdown is displayed
   * @type { boolean }
   */
  public showLevel: boolean;
  /**
   * Language level
   * @type { LanguageLevel }
   */
  public languageLevel: LanguageLevel;
  /**
   * Array of selected types of learning
   * @type { Array<TypeOfLearning> }
   */
  public selectedTypes: Array<TypeOfLearning>;
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
   * Selected language
   * @type { Language }
   */
  @Input() language: Language;
  /**
   * Emit to parent component when closing
   * @type { EventEmitter<void> }
   */
  @Output() closingAction: EventEmitter<string> = new EventEmitter<string>();
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
    this.selectedTypes = [...this.language.types];
    this.languageLevel = this.language.level;
  }

  /**
   * Method for adding types of learning
   * @param selectedType
   */
  public addType(selectedType: TypeOfLearning) {
    if (this.selectedTypes.find((type) => type.id === selectedType.id)) {
      this.selectedTypes = this.selectedTypes.filter((type) => type.id !== selectedType.id);
    } else {
      this.selectedTypes[this.selectedTypes.length] = selectedType;
    }
  }

  /**
   * Method for selecting checked options
   * @param { number } typeId
   */
  isTypeSelected(typeId: number): boolean {
    return !!this.language?.types?.find((tl) => tl.id === typeId);
  }

  /**
   * Method for editing language
   */
  public edit() {
    this.store.dispatch(LanguageActions.update({ language: {
      ...this.language,
        level: this.languageLevel,
        types: this.selectedTypes
    }}));
    this.closingAction.emit('edit');
  }

  /**
   * Method for deleting language
   */
  public delete() {
    this.store.dispatch(LanguageActions.delete({languageId: this.language.id}));
    this.closingAction.emit('delete');
  }
}
