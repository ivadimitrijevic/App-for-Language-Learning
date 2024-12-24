import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { LanguageLevelActions } from '../../store/actions/language-level.actions';
import { LanguageLevel } from '../../utils/types/language-level.type';
import { selectLevels } from '../../store/reducers/language-level.reducer';
import { HeaderComponent } from '../../../header/components/header/header.component';
import { ConfirmationPopUpComponent } from '../../../messages-pop-up/confirmation-pop-up/confirmation-pop-up.component';
import { ErrorPopUpComponent } from '../../../messages-pop-up/error-pop-up/error-pop-up.component';

/**
 * LanguageLevelsPage component
 */
@Component({
  selector: 'app-language-level-page',
  standalone: true,
  imports: [
    AsyncPipe,
    HeaderComponent,
    ConfirmationPopUpComponent,
    ErrorPopUpComponent,
    CdkDropList,
    CdkDrag,
    CdkDragHandle
  ],
  templateUrl: './language-level-page.component.html',
  styleUrl: './language-level-page.component.scss'
})
export class LanguageLevelPageComponent implements OnInit {
  /**
   * Array of language levels
   * @type { Array<LanguageLevel> }
   */
  public languageLevels: Array<LanguageLevel>;
  /**
   * Indicator whether error pop up is displayed
   * @type { boolean }
   */
  public displayError: boolean = false;
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
   * Indicator whether creating is in progress
   * @type { boolean }
   */
  public creatingMode: boolean = false;
  /**
   * Array of edit modes
   * @type { Array<boolean> }
   */
  public editModes: Array<boolean> = [];
  /**
   * Observable of array of language levels
   * @type { Observable<Array<LanguageLevel>> }
   */
  public languageLevels$: Observable<Array<LanguageLevel>> = this.store.select(selectLevels);
  /**
   * Input levelName
   * @type { ElementRef }
   */
  @ViewChild('levelName')levelName!:ElementRef;
  /**
   * Input newLevelName
   * @type { ElementRef }
   */
  @ViewChild('newLevelName')newLevelName!:ElementRef;
  /**
   * Constructor of language-level-page component
   * @param { Store } store
   */
  constructor(private store: Store) {
  }
  /**
   * OnInit method of language-level-page component
   */
  ngOnInit(): void {
    this.store.dispatch(LanguageLevelActions.loadAll());
    this.languageLevels$.subscribe((levels) => {
      if (levels) {
        this.editModes = levels.map((level) => false);
        this.languageLevels = [...levels];
      }
    })
  }

  /**
   * Method for changing edit mode
   * @param { number } index
   */
  public changeEditMode(index: number) {
    this.editModes = this.editModes.map((editMode) => false);
    this.editModes[index] = true;
  }

  /**
   * Method for updating language level
   * @param { number } levelId
   */
  public updateLevel(levelId: number) {
    if (this.levelName.nativeElement.value) {
      this.store.dispatch(LanguageLevelActions.update({levelId: levelId, name: this.levelName.nativeElement.value}));
    } else {
      this.message = 'The name field is required!'
      this.displayError = true;
    }
  }

  /**
   * Method for exiting from edit mode
   */
  public closeEdit() {
    this.editModes = this.editModes.map((editMode) => false);
  }

  /**
   * Method for creating level
   */
  public createLevel() {
    if (this.newLevelName.nativeElement.value) {
      this.store.dispatch(LanguageLevelActions.create({name: this.newLevelName.nativeElement.value}));
      this.creatingMode = false;
      this.message = 'You have successfully added new Language Level!';
      this.displayConfirmation = true;
    } else {
      this.message = 'The name field is required!'
      this.displayError = true;
    }
  }

  /**
   * Method for reordering
   * @param event
   */
  public drop(event: CdkDragDrop<LanguageLevel[]>) {
    const orderedList = [...this.languageLevels]
    moveItemInArray(orderedList, event.previousIndex, event.currentIndex);
    this.languageLevels = orderedList;
    this.store.dispatch(LanguageLevelActions.changeOrder({ levels: this.languageLevels }));
  }
}
