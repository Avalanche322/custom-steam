import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsService } from './services/friends.service';
import { ItemFriendComponent } from './item-friend/item-friend.component';
import { SharedModule } from './../shared/shared.module';
import { FriendsPageComponent } from './friends-page.component';
import { MyFriendsComponent } from './my-friends/my-friends.component';
import { SearchFriendsComponent } from './search-friends/search-friends.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    FriendsPageComponent,
    ItemFriendComponent,
    MyFriendsComponent,
    SearchFriendsComponent,
    SearchFormComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  providers: [FriendsService],
  exports: [FriendsPageComponent]
})
export class FriendsPageModule { }
