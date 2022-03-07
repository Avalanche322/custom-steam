import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GamesDbService } from '../services/games-db.service';
@Component({
  selector: 'app-games-search',
  templateUrl: './games-search.component.html',
  styleUrls: ['./games-search.component.scss']
})
export class GamesSearchComponent implements OnInit, OnChanges {
  @Output() searchOutput: EventEmitter<any> = new EventEmitter();
  @Input() triggerSearch: boolean = false;
  gameName: string = '';
  searchResult: any[] = [];
  validationError: boolean = false;

  constructor(private searchService: GamesDbService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.validationError) {
      return
    }
    this.searchOutput.emit(this.gameName.trim())
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onSubmit();
  }

}
