import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgClass, NgForOf } from '@angular/common';

import { Store } from '@ngrx/store';

import { PusherService } from '../../services/pusher.service';
import { User } from '../../../user/utils/types/user.type';
import { Message } from '../../utils/types/message.type';
import { ChatActions } from '../../store/actions/chat.actions';
import { AutoScrollDirective } from '../auto-scroll';
import { PaginationInformation } from '../../../pagination/utils/types/pagination-information.type';

/**
 * Chat component
 */
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgClass,
    DatePipe,
    AutoScrollDirective
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnDestroy, AfterViewInit, OnInit {
  /**
   * Chat chanel
   * @type { any }
   * @private
   */
  public chatChannel: any;
  /**
   * New Message
   * @type { string }
   */
  public newMessage: string = '';
  /**
   * Messages from chat
   * @type { Array<Message> }
   */
  public myMessages: Array<Message>;
  /**
   * Message div
   * @type { ElementRef }
   */
  @ViewChild('messagesDiv') messagesDiv!: ElementRef;
  /**
   * Current user
   * @type { User }
   */
  @Input() currentUser: number;
  /**
   * Friend
   * @type { User }
   */
  @Input() friend: number;
  /**
   * Messages
   * @type { Array<Message> }
   */
  @Input() messages: Array<Message>;
  /**
   * Pagination information
   * @type { paginationInformation }
   */
  @Input() paginationInformation: PaginationInformation;
  /**
   * Emit to parent component when more messages are loaded
   * @type { EventEmitter<number> }
   */
  @Output() loadedMore: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Constructor of chat-component
   * @param { PusherService } pusherService
   * @param { HttpClient } http
   * @param { Store } store
   */
  constructor(
    private pusherService: PusherService,
    private http: HttpClient,
    private store: Store,
  ) {}

  /**
   * OnInit method of chat component
   */
  ngOnInit(): void {
    if (this.messages) {
      this.myMessages = [...this.messages];
    } else {
      this.myMessages = [];
    }
    if (this.currentUser && this.friend) {
      this.chatChannel = this.pusherService.subscribeToChannel('chat-channel');
      this.chatChannel.bind('message-sent', (data: any) => {
        if (data.fromUser === this.friend &&
          data.toUser === this.currentUser
        ) {
          this.myMessages = [...this.myMessages, <Message>data];
          this.scrollToBottom();
        }
      });
    }
  }

  /**
   * NgAfterInit method of chat component
   */
  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  /**
   * Method to scroll to the end of messages
   */
  public scrollToBottom() {
    const element = this.messagesDiv.nativeElement;
    element.scrollTop = element.scrollHeight;
  }

  /**
   * Method for sending messages
   */
  sendMessage(): void {
    this.store.dispatch(ChatActions.create({ fromUser: this.currentUser, toUser: this.friend, content: this.newMessage }));
    this.myMessages = [...this.myMessages, <Message>{fromUser: this.currentUser, toUser: this.friend, content: this.newMessage, createdAt: new Date()}];
    this.newMessage = '';
    this.scrollToBottom();
  }

  /**
   * Method for unsubscribing
   */
  ngOnDestroy(): void {
    this.pusherService.unsubscribeFromChannel('chat-channel');
  }
}
