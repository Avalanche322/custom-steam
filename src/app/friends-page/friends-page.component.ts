import { Observable } from 'rxjs';
import { take } from 'rxjs';
import { Component, OnInit, Output } from '@angular/core';

import { DataService } from './../services/data.service';
import { FriendsService } from './services/friends.service';
import { User } from '../interface/User';
import { LoaderService } from './../services/loader.service';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss']
})

export class FriendsPageComponent implements OnInit {
  searchBtnClick: boolean = false;
  searchCnageInput: boolean = false;
  showNotification: boolean = false;
  user$: Observable<any> = this.auth.currentUser$;
  typeNotification: string = '';
  textNotification: string = '';
  user!: User

  @Output() titleSearch: string = 'Friends';
  @Output() searchName: string = '';
  @Output() friends: User[] = [];
  @Output() findFriends: User[] = [];
  @Output() isEmptyFriend: boolean = !!this.friends.length;
  @Output() isEmptyFindFriend: boolean = !!this.findFriends.length;

  constructor(
    private friendsService: FriendsService,
    private dataService: DataService,
    public loaderService: LoaderService,
    private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.loaderService.start();
    this.user$.pipe(take(1))
    .subscribe(user => {
      this.user = user
      /*Get friends array*/
      this.dataService.getDataFromArray(`users/${this.user?.uid}`, 'friends').pipe(take(1))
      .subscribe({
        next: (res) => {
          if (res === 'complete') {
            this.isEmptyFriend = false;
          } else {
            this.friends = res
            this.isEmptyFriend = !!this.friends
          }
          this.loaderService.finish();
        },
        error: (err) => {
          alert(err);
          this.loaderService.finish();
        }
      })
    })

  }

  onInputChange(name: string): void {
    this.searchCnageInput = !!name.length
    if (!this.searchCnageInput) {
      this.searchBtnClick = false;
    }
  }
  triggerNotification(type: string, name: string): void {
    this.typeNotification = type;
    this.textNotification = type === 'add' ? `you added new friend ${name}` : `you removed your friend ${name}`
    this.showNotification = !this.showNotification;
    setTimeout(()=> this.showNotification = !this.showNotification, 2000);
  }

  searchFriends(name: string): void {
    if (name.trim()) {
      this.loaderService.start();
      this.searchBtnClick = true;
      this.friendsService.getUsers(name, 'users', this.user.uid).pipe(take(1))
      .subscribe({
        next: (res) => {
          this.findFriends = res;
          this.isEmptyFindFriend = !!this.findFriends.length
          this.searchName = name;
          this.loaderService.finish();
        },
        error: (err) => {
          alert(err);
          this.loaderService.finish();
        }
      })
    }
  }
  async addFriend(user: User): Promise<void> {
    try {
      this.loaderService.start();
      await this.dataService.addDataToArray(user.uid, `users/${this.user.uid}`);
      await this.dataService.addDataToArray(this.user.uid, `users/${user.uid}`);
      this.friends.push(user);
      this.triggerNotification('add', user.displayName)
      this.isEmptyFriend = !!this.friends
      this.loaderService.finish();
    } catch (err) {
      alert(err);
      this.loaderService.finish();
    }
  }
  async deleteFriend(user: User): Promise<void> {
    try {
      this.loaderService.start();
      await this.dataService.deleteDataFromArray(user.uid, `users/${this.user.uid}`);
      await this.dataService.deleteDataFromArray(this.user.uid, `users/${user.uid}`);
      this.triggerNotification('remove', user.displayName)
      this.friends = this.friends.filter(f => f.uid !== user.uid)
      this.isEmptyFriend = !!this.friends.length;
      this.loaderService.finish();
    } catch (err) {
      alert(err);
      this.loaderService.finish();
    }
  }

}
