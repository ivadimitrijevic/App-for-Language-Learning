import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { TypeOfLearning } from '../../utils/types/type-of-learning.type';
import { selectTypes } from '../../store/reducers/type-of-learning.reducer';
import { TypeOfLearningActions } from '../../store/actions/type-of-learning.actions';
import { HeaderComponent } from '../../../header/components/header/header.component';
import { ConfirmationPopUpComponent } from '../../../messages-pop-up/confirmation-pop-up/confirmation-pop-up.component';
import { ErrorPopUpComponent } from '../../../messages-pop-up/error-pop-up/error-pop-up.component';


@Component({
  selector: 'app-type-of-learning-page',
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
  templateUrl: './type-of-learning-page.component.html',
  styleUrl: './type-of-learning-page.component.scss'
})
export class TypeOfLearningPageComponent implements OnInit {
  /**
   * Array of types of learning
   * @type { Array<TypeOfLearning> }
   */
  public typesOfLearning: Array<TypeOfLearning>;
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
  public typesOfLearning$: Observable<Array<TypeOfLearning>> = this.store.select(selectTypes);
  /**
   * Input typeName
   * @type { ElementRef }
   */
  @ViewChild('typeName')typeName!:ElementRef;
  /**
   * Input newLevelName
   * @type { ElementRef }
   */
  @ViewChild('newTypeName')newTypeName!:ElementRef;
  /**
   * Constructor of type-of-learning-page component
   * @param { Store } store
   */
  constructor(private store: Store) {
  }
  /**
   * OnInit method of type-of-learning-page component
   */
  ngOnInit(): void {
    this.store.dispatch(TypeOfLearningActions.loadAll());
    this.typesOfLearning$.subscribe((typesOfLearning) => {
      if (typesOfLearning) {
        this.editModes = typesOfLearning.map((typeOfLearning) => false);
        this.typesOfLearning = typesOfLearning;
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
   * Method for updating type of learning
   * @param { number } levelId
   */
  public updateType(levelId: number) {
    if (this.typeName.nativeElement.value) {
      this.store.dispatch(TypeOfLearningActions.update({typeId: levelId, name: this.typeName.nativeElement.value}));
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
   * Method for creating type of learning
   */
  public createType() {
    if (this.newTypeName.nativeElement.value) {
      this.store.dispatch(TypeOfLearningActions.create({ name: this.newTypeName.nativeElement.value }));
      this.creatingMode = false;
      this.message = 'You have successfully created new Type Of Learning!';
      this.displayConfirmation = true;
      this.newTypeName = null;
    } else {
      this.message = 'The name field is required!'
      this.displayError = true;
    }
  }

  /**
   * Method for reordering
   * @param event
   */
  public drop(event: CdkDragDrop<TypeOfLearning[]>) {
    const orderedList = [...this.typesOfLearning]
    moveItemInArray(orderedList, event.previousIndex, event.currentIndex);
    this.typesOfLearning = orderedList;
    this.store.dispatch(TypeOfLearningActions.updateOrder({ typesOfLearning: this.typesOfLearning }));
  }
}
