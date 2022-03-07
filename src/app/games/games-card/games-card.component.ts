import { Component, OnInit, Input } from '@angular/core';
import { GameModel } from '../models/game.model';
import { GamesUserService } from '../services/games-user.service';

@Component({
  selector: 'app-games-card',
  templateUrl: './games-card.component.html',
  styleUrls: ['./games-card.component.scss']
})

export class GamesCardComponent implements OnInit {
  @Input() gameInfo!: GameModel;
  @Input() notLibraryItem: boolean = true;
  @Input() userHasInLib: boolean = false;
  showNotification: boolean = false;
  gameName: string = '';
  userLogged: boolean = !localStorage.getItem('userId');

  constructor(private userService: GamesUserService) { }

  ngOnInit(): void {}

  triggerNotification(name: string) {
    this.gameName = name;
    this.showNotification = !this.showNotification;
    setTimeout(()=> this.showNotification = !this.showNotification, 2000);
  }

  changeUserLibrary(gameId: string) {
    if (this.userHasInLib) {
      this.userService.removeUserGame(gameId);
    } else {
      this.userService.addUserGame(gameId);
    }
    this.userHasInLib = !this.userHasInLib;
  }

}
