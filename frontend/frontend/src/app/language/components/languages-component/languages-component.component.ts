import { Component, Input } from '@angular/core';

import { Language } from '../../utils/types/language.type';
import { AddNewLanguageComponent } from '../add-new-language/add-new-language.component';
import { EditLanguageComponent } from '../edit-language/edit-language.component';
import { ConfirmationPopUpComponent } from '../../../messages-pop-up/confirmation-pop-up/confirmation-pop-up.component';

/**
 * Languages component
 */
@Component({
  selector: 'app-languages-component',
  standalone: true,
  imports: [
    AddNewLanguageComponent,
    EditLanguageComponent,
    ConfirmationPopUpComponent
  ],
  templateUrl: './languages-component.component.html',
  styleUrl: './languages-component.component.scss'
})
export class LanguagesComponentComponent {
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
   * Indicator whether component for adding new language is visible
   * @type { boolean }
   */
  public displayAdding: boolean = false;
  /**
   * Indicator whether component for editing new language is visible
   * @type { boolean }
   */
  public displayEditing: boolean = false;
  /**
   * Selected language for editing
   * @type { Language }
   */
  public selectedLanguage: Language;
  /**
   * Array of languages
   * @type { Array<Language> }
   */
  @Input() languages: Array<Language>;
  /**
   * Indicator if adding is enabled
   * @type { boolean }
   */
  @Input() enableAdding: boolean;
  /**
   * Indicator whether user knows languages
   * @type { boolean }
   */
  @Input() known: boolean;
  /**
   * Title
   * @type { string }
   */
  @Input() title: string;

  /**
   * Method for opening editing language pop-up
   * @param { Language } language
   */
  public displayEditingComponent(language: Language) {
    this.displayEditing = true;
    this.selectedLanguage = language;
  }

  /**
   * Method for closing creating language pop-up
   * @param { boolean } added
   */
  public closeAdding(added: boolean) {
    this.displayAdding = false;
    if (added) {
      this.message = 'You have successfully added new language!';
      this.displayConfirmation = true;
    }
  }

  /**
   * Method for closing editing language pop-up
   * @param { boolean } edited
   */
  public closeEditing(edited: string) {
    this.displayEditing = false;
    if (edited === 'edit') {
      this.message = 'You have successfully edited language!';
      this.displayConfirmation = true;
    } else if (edited === 'delete') {
      this.message = 'You have successfully deleted language!';
      this.displayConfirmation = true;
    }
  }
}
