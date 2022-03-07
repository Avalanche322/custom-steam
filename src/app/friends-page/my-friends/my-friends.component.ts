import { Component, Input, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/interface/User';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.scss']
})
export class MyFriendsComponent {
  @Input() friends: User[] = []
  @Input() isEmptyFriend: boolean = !!this.friends.length
  @Output() @Input() disableBtn: boolean | null = false;

  @Output() deleteFriend = new EventEmitter();

  constructor() { }

  handelDeleteFriend(user: User): void{
    this.deleteFriend.emit(user)
  }

}
