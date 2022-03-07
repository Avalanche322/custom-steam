import { Component, OnInit } from '@angular/core';
import { FilterModel } from '../models/filter.model';

@Component({
  selector: 'app-games-main',
  templateUrl: './games-main.component.html',
  styleUrls: ['./games-main.component.scss']
})
export class GamesMainComponent implements OnInit {
  searchQuery: any[] = [];
  filterQuery!: FilterModel;
  triggerSearchParent: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  setSearchQuery(event : any) {
    this.searchQuery = event;
  }

  setFilterQuery(event : any) {
    this.filterQuery = event;
    this.triggerSearchParent = !this.triggerSearchParent;
  }
}
