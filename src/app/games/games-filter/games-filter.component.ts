import { Component, OnInit, Output,  EventEmitter  } from '@angular/core';
import { FilterModel } from '../models/filter.model';
import { GamesDbService } from '../services/games-db.service';

@Component({
  selector: 'app-games-filter',
  templateUrl: './games-filter.component.html',
  styleUrls: ['./games-filter.component.scss']
})
export class GamesFilterComponent implements OnInit {
  @Output() filterOutput = new EventEmitter<FilterModel>();
  range: number = 0;
  maxPrice!: number;
  tags: any[] = [];
  filterToApply: any;

  constructor(private searchService: GamesDbService) { }

  ngOnInit(): void {
    this.tags = this.searchService.getTags();
    this.searchService.getData()
    .subscribe({
      next: data => {
        this.maxPrice = Math.max(...data.map((el: { price: number; }) => el.price));
     },
     error: err => console.log(err)
    })
  }

  onFilterSubmit(value: any) {
    this.filterToApply = { price: 0, tags: []} //reset object for change detection
    for (let key in value) {
      if (typeof value[key] === 'number') {
        this.filterToApply.price = value[key]
      } else if (value[key] === true) {
        this.filterToApply.tags.push(key);
      }
    }
    this.filterOutput.emit(this.filterToApply);
  }
}
