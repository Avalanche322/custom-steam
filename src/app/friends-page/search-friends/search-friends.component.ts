import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from 'src/app/interface/User';

@Component({
  selector: 'app-search-friends',
  templateUrl: './search-friends.component.html',
  styleUrls: ['./search-friends.component.scss']
})
export class SearchFriendsComponent {
  @Input() searchName: string = '';
  @Input() findFriends: User[] = [];
  @Input() friends: User[] = [];
  @Input() isEmptyFindFriend: boolean = !!this.findFriends.length;
  @Output() @Input() disableBtn: boolean | null = false;

  @Output() deleteFriend = new EventEmitter();
  @Output() addFriend = new EventEmitter();

  constructor() { }

  handelDeleteFriend(user: User): void{
    this.deleteFriend.emit(user)
  }
  handelAddFriend(user: User): void{
    this.addFriend.emit(user)
  }
  addOrDeleteFriend(user: User): boolean{
    return this.friends.some(u => u.uid === user.uid)
  }

}
