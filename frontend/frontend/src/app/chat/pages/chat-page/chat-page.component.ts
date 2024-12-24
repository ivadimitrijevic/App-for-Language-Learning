import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { ChatComponent } from '../../components/chat/chat.component';
import { ChatActions } from '../../store/actions/chat.actions';
import { Message } from '../../utils/types/message.type';
import { selectMessages, selectPaginationInfo } from '../../store/reducers/chat.reducer';
import { FriendActions } from '../../../friend/store/actions/friend.actions';
import { Friend } from '../../../friend/utils/types/friend.type';
import { selectFriends } from '../../../friend/store/reducers/friend.reducer';
import { FriendsChatComponent } from '../../components/friends-chat/friends-chat.component';
import { PaginationInformation } from '../../../pagination/utils/types/pagination-information.type';

/**
 * Chat page
 */
@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [
    ChatComponent,
    FriendsChatComponent,
    AsyncPipe
  ],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements OnInit {
  /**
   * Selected friend
   * @type { number }
   */
  public selectedFriend: number;
  /**
   * Id of current user
   * @type { number }
   */
  public currentUserId: number;
  /**
   * Logged in user
   */
  public currentUser = JSON.parse(localStorage.getItem('currentUser'));
  /**
   * Observable of array of messages
   * @type { Observable<Array<Message>> }
   */
  public messages$: Observable<Array<Message>> = this.store.select(selectMessages);
  /**
   * Observable of pagination information
   * @type { Observable<PaginationInformation> }
   */
  public paginationInfo$: Observable<PaginationInformation> = this.store.select(selectPaginationInfo);
  /**
   * Observable of user's friends
   * @type { Observable<Array<>Friend> }
   */
  public friends$: Observable<Array<Friend>> = this.store.select(selectFriends);
  /**
   * Constructor of chat-page component
   * @param { Store } store
   */
  constructor(private store: Store) {
  }

  /**
   * OnInit method of chat-page component
   */
  ngOnInit(): void {
    this.currentUserId = this.currentUser.id;
    this.store.dispatch(FriendActions.loadAll({ userId: this.currentUserId }));
  }

  /**
   * Method for changing selected friend
   * @param { number } friend
   */
  public changeFriend(friend: number) {
    this.selectedFriend = friend;
    this.store.dispatch(ChatActions.loadAll({ fromUser: this.currentUserId, toUser: friend }));
  }

  /**
   * Method for loading more messages
   * @param { number } page
   */
  public loadMessages(page: number) {
    this.store.dispatch(ChatActions.loadAll({ fromUser: this.currentUserId, toUser: this.selectedFriend, page: page }))
  }

}
