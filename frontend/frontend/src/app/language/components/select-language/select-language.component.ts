import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe, JsonPipe, KeyValuePipe, NgForOf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LANGUAGES_LIST } from '../../../../assets/languages'

/**
 * SelectLanguage component
 */
@Component({
  selector: 'app-select-language',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    ReactiveFormsModule,
    JsonPipe,
    KeyValuePipe,
    FormsModule
  ],
  templateUrl: './select-language.component.html',
  styleUrl: './select-language.component.scss'
})
export class SelectLanguageComponent {
  /**
   * Indicator whether drop down is visible
   * @type { boolean }
   */
  public showDropdown: boolean;
  /**
   * Languages
   * @type { { [key: string]: { name: string; nativeName: string } } }
   */
  public languages: { [key: string]: { name: string; nativeName: string } } = null;
  /**
   * Name of language
   * @type { string }
   */
  @Input() languageName: string;
  /**
   * Placeholder
   * @type { string }
   */
  @Input() placeholder: string;
  // @Input() preselectedLanguage: string
  /**
   * Emit to parent component when language is chosen
   * @type { EventEmitter<string> }
   */
  @Output() languageSelected: EventEmitter<string> = new EventEmitter<string>
  /**
   * Method for searching languages
   * @param event
   */
  public onSearch(event: any) {
    this.showDropdown = true;
    const input = (event.target as HTMLInputElement).value.toLowerCase();

    if (!input) {
      this.languages = LANGUAGES_LIST;
    } else {
      this.languages = Object.fromEntries(
        Object.entries(LANGUAGES_LIST)
          .filter(([code, lang]) => lang.name.toLowerCase().includes(input))
      );
    }
  }

  /**
   * Method for choosing language
   * @param { string } name
   */
  public selectLanguage(name: string) {
    this.languageName = name;
    this.showDropdown = false;
    this.languageSelected.emit(name);
  }
}
