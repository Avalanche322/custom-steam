import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, take } from 'rxjs';
import { GamesDbService } from '../services/games-db.service';
import { LoaderService } from 'src/app/services/loader.service';
import { GamesFilterService } from '../services/games-filter.service';
import { GamesUserService } from '../services/games-user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit, OnChanges  {
  @Input() searchForList: any;
  @Input() filterForList: any;
  filteredList: any[] = [];
  user$: Observable<any> = this.auth.currentUser$;
  user: any = '';
  userGamesList: string[] = [];

  constructor(private searchService: GamesDbService,
     private filterService: GamesFilterService,
     private userService: GamesUserService,
      public loaderService: LoaderService,
      private auth: AuthenticationService
      ) { }

  ngOnInit(): void {
    this.loaderService.start();
    this.user$.pipe(take(1))
    .subscribe(userData => {
      this.user = userData?.uid;
      this.searchService.getData().pipe(take(1))
      .subscribe({
        next: data => {
          this.filteredList = data;
          if(this.user) {
            this.userService.getUserData(this.user).pipe(take(1))
            .subscribe({
              next:userData => {
                this.userGamesList = userData.games;
                this.loaderService.finish();
              },
              error: err => {
                console.log(err);
                this.loaderService.finish();
              }
          })
          }
          this.loaderService.finish();
        },
        error: err => {
          console.log(err);
          this.loaderService.finish();
        }
    })
  })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loaderService.start();
    let filteredGames: any[];
    let wordsToCheck : string[];
      this.searchService.getData().pipe(take(1))
      .subscribe({
        next: data => {
          filteredGames = data;
          if (this.searchForList) {
            wordsToCheck = this.searchForList.split(' ');
            filteredGames = filteredGames.
            filter(el => this.filterService.checkWordsMatch(wordsToCheck, el.name)); //filter by words
          }
          filteredGames = this.filterService.filterByPriceTags(filteredGames, this.filterForList); // filter by price and tags
          this.filteredList = filteredGames;
          this.loaderService.finish();
      },
      error: err => {
        console.log(err);
        this.loaderService.finish();

      }
    })

    }

    checkUserLibrary(gameId: string) {
      if(this.user) {
        return this.userService.checkGamesMatch(this.userGamesList, gameId);
      }
      return false;
}

}



