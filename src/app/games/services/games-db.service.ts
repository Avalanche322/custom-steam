import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GameModel } from '../models/game.model'

@Injectable({
  providedIn: 'root'
})

export class GamesDbService {

  constructor(private firestore: Firestore) { }

  ngOnInit(): void { }

  getData() {
    const ItemCollection = collection(this.firestore, 'games');
    return collectionData(ItemCollection, { idField: 'id' }) as Observable<GameModel[]>;
  }

  getTags() {
    const tags: string[] = [];
    this.getData().subscribe({
      next: data => {
        data.forEach(item => {
          item.tags.forEach(tag => {
            if (!tags.includes(tag)) {
              tags.push(tag);
            }
          })
        })
      },
      error: err => console.log(err)
  });
    return tags;
  }
}
