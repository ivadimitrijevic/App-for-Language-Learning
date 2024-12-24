import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * ErrorPopUp component
 */
@Component({
  selector: 'app-error-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './error-pop-up.component.html',
  styleUrl: './error-pop-up.component.scss'
})
export class ErrorPopUpComponent {
  /**
   * Message
   * @type { string }
   */
  @Input() message: string;
  /**
   * Emit to parent component when pop up is closed
   * @type { EventEmitter<void> }
   */
  @Output() closingAction: EventEmitter<void> = new EventEmitter<void>();
}
