import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * ConfirmationPopUp component
 */
@Component({
  selector: 'app-confirmation-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-pop-up.component.html',
  styleUrl: './confirmation-pop-up.component.scss'
})
export class ConfirmationPopUpComponent {
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
