import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);
  userId !: any;
  constructor(private auth: Auth) { }

  login(username: string, password: string) {
    this.currentUser$.subscribe(user => {
      if(user){
        localStorage.setItem('userId', `${user.uid}`);
      }
    });
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signUp(email: string, password: string) {
    this.currentUser$.subscribe(user => {
      if(user){
        localStorage.setItem('userId', `${user.uid}`);
      }
    });
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    this.clearUserId();
    return from(this.auth.signOut());
  }

  clearUserId() {
    localStorage.removeItem('userId')
  }
}
