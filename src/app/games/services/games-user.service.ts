import { Injectable } from '@angular/core';
import {
  Firestore, doc, docData,
  updateDoc, arrayUnion, arrayRemove
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GamesUserService {

  constructor(private firestore: Firestore) { }

  getUserData(id: string) {
    const userRef = doc(this.firestore, `users/${id}`);
    return docData(userRef, { idField: 'id' }) as Observable<UserModel>;
  }

  checkGamesMatch(userList: string[], gameId: string) {
    return userList.includes(gameId);
   }

   addUserGame(id: string) {
    const userDocRef = doc(this.firestore, `users/${localStorage.getItem('userId')}`);
    return updateDoc(userDocRef, { games: arrayUnion(id) });
    }

   removeUserGame(id: string) {
    const userDocRef = doc(this.firestore, `users/${localStorage.getItem('userId')}`);
    return updateDoc(userDocRef, { games: arrayRemove(id) });
   }
}
