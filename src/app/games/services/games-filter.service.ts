import { Injectable } from '@angular/core';
import { FilterModel } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class GamesFilterService {

  constructor() { }

  checkWordsMatch(words: string[], name: string): boolean {
    const regs = words.map(item => new RegExp('\\b' + item + '\\b', 'gi'));
    for(let i = 0; i < regs.length; i++) {
      if(name.match(regs[i])?.length) {
        return true;
      }
    }
    return false;
  }

  filterByPriceTags(gamesList: any[], filtersToApply: FilterModel) {
    if (filtersToApply && filtersToApply.price > 0) {
      gamesList = gamesList
      .filter(game => game.price <= filtersToApply.price);
    }
    if(filtersToApply && filtersToApply.tags.length) {
      gamesList = gamesList.
      filter(game => this.checkTagsMatch(game.tags, filtersToApply.tags))
    }
    return gamesList;
  }

  checkTagsMatch(gameTags: string[], tags: string[]) {
   return !!(gameTags.filter(gameTag => tags.includes(gameTag)).length)
  }
}
