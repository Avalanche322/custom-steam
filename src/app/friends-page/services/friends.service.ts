import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { query, where } from 'firebase/firestore';
import { map, Observable } from 'rxjs';

import { User } from '../../interface/User';

@Injectable()

export class FriendsService {

  constructor(private firestore: Firestore) { }

  getUsers(name: string, url: string, curUid: string): Observable<User[]>{
    const ItemCollection = collection(this.firestore, url);
    const q = query(ItemCollection, where('uid', '!=', curUid))
    const users$ = collectionData(q) as Observable<User[]>;
    return users$.pipe(
      map(users => {
        return users.filter(u => u.displayName.toLowerCase().includes(name.toLowerCase()))
      }),
    )
  }
}
