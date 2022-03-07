import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { User } from '../interface/User';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get currentUserProfile$(): Observable<User | null> {
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<User>;
      })
    )
  }

  constructor(private firestore: Firestore, private authService: AuthenticationService) { }

  addUser(user: User) : Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid)
    return from(setDoc(ref, user));
  }

  updateUser(user: User) : Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid)
    return from(updateDoc(ref, {...user}));
  }

}
