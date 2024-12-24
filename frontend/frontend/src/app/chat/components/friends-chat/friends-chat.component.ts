import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';

import { Friend } from '../../../friend/utils/types/friend.type';
import { User } from '../../../user/utils/types/user.type';
import { FormsModule } from '@angular/forms';

/**
 * FriendsChat component
 */
@Component({
  selector: 'app-friends-chat',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './friends-chat.component.html',
  styleUrl: './friends-chat.component.scss'
})
export class FriendsChatComponent implements OnInit {
  /**
   * List of friends
   * @type { Array<User> }
   */
  public friendsList: Array<User>;

  public selectedFriendId: number = -1;
  /**
   * Friends
   * @type { Array<Friend> }
   */
  @Input() friends: Array<Friend>;
  /**
   * Id of current user
   * @type { number }
   */
  @Input() currentUserId: number;
  /**
   * Emit to parent component when selected friend is changed
   * @type { EventEmitter<number> }
   */
  @Output() changedFriend: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    if (this.friends && this.currentUserId) {
      this.friendsList = this.friends.map((friend) => friend.user.id === this.currentUserId ? friend.friend : friend.user);
    }
  }
  /**
   * OnInit method for friends-chat component
   */
  ngOnInit(): void {
    if (this.friends && this.currentUserId) {
      this.friendsList = this.friends.map((friend) => friend.user.id === this.currentUserId ? friend.friend : friend.user);
    }
  }

  public selectFriend(friend: User) {
    this.selectedFriendId = friend.id;
    this.changedFriend.emit(friend.id);
  }
}
