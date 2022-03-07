import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interface/User';

@Component({
  selector: 'app-item-friend',
  templateUrl: './item-friend.component.html',
  styleUrls: ['./item-friend.component.scss']
})
export class ItemFriendComponent {

  @Input() user!: User;
  @Input() typeItem: string = 'friend';
  @Input() disableBtn: boolean | null = false;

  @Output() btnClick = new EventEmitter();

  constructor() { }

  onClick(): void{
		this.btnClick.emit(this.user)
	}

}
