import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesSearchComponent } from './games-search/games-search.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GamesFilterComponent } from './games-filter/games-filter.component';
import { GamesMainComponent } from './games-main/games-main.component';
import { GamesCardComponent } from './games-card/games-card.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GamesLibraryComponent } from './games-library/games-library.component';
import { ClipboardModule } from 'ngx-clipboard';
import { GamesNotificationComponent } from './games-notification/games-notification.component'


@NgModule({
  declarations: [
    GamesSearchComponent,
    GamesListComponent,
    GamesFilterComponent,
    GamesMainComponent,
    GamesCardComponent,
    GamesLibraryComponent,
    GamesNotificationComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ClipboardModule
  ]
})
export class GamesModule { }
