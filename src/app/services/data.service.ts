import { Injectable } from '@angular/core';
import { Firestore, doc, docSnapshots } from '@angular/fire/firestore';
import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
import { map, Observable, switchMap, combineLatest, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private firestore: Firestore) { }

  getDataFromArray(url: string, nameOfArray: string): Observable<any>{
    let key = url.split('/')[0]
    let uid = url.split('/')[1];
    const ItemDocs = doc(this.firestore, `users/${uid}`);
    const user$ = docSnapshots(ItemDocs).pipe(map(data => data.data()))
    return user$.pipe(
      map(users => users?.[nameOfArray]),
      switchMap(uids => {
        if(uids.length) {
          let sourse = uids.map((uid: string) => {
            const ItemCollection = doc(this.firestore, `${key}/${uid}`);
            return docSnapshots(ItemCollection).pipe(map(data => data.data()))
          })
          return combineLatest(sourse)
        } else {
          return of('complete')
        }
      })
    )
  }
  addDataToArray(uids: string, url: string): Promise<void> {
    const itemDocRef = doc(this.firestore, url);
    return updateDoc(itemDocRef, {friends: arrayUnion(uids)})
  }
  deleteDataFromArray(data: any, url: string): Promise<void> {
    const itemDocRef = doc(this.firestore, url);
    return updateDoc(itemDocRef, {friends: arrayRemove(data)})
  }
}
