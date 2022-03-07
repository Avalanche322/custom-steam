import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { GameModel } from '../models/game.model';
import { GamesDbService } from '../services/games-db.service';
import { GamesUserService } from '../services/games-user.service';

@Component({
  selector: 'app-games-library',
  templateUrl: './games-library.component.html',
  styleUrls: ['./games-library.component.scss']
})
export class GamesLibraryComponent implements OnInit {
  libraryGames: GameModel[] = [];
  constructor(private searchService: GamesDbService,
     public loaderService: LoaderService,
     private userService: GamesUserService) { }


  ngOnInit(): void {
    this.loaderService.start()
    const userId = localStorage.getItem('userId');
    if(userId) {
      this.userService.getUserData(userId)
      .subscribe({
        next: userData => {
          if (userData.games.length) {
            this.searchService.getData().pipe(take(1))
            .subscribe({
              next: gamesData => {
                this.libraryGames = gamesData
                .filter(game => userData.games.includes(game.id));
              },
              error: err => {
                console.log(err);
                this.loaderService.finish();
              }
            });
          }
          this.loaderService.finish();
      },
      error: err => {
        console.log(err);
        this.loaderService.finish();
      }
    })

    } else {
      this.loaderService.finish();
    }
  }

}
