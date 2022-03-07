import { Component, OnInit } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { FormGroup, FormControl} from '@angular/forms';
import { updateDoc } from 'firebase/firestore';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    name: new FormControl('')
  });

  user$ = this.usersService.currentUserProfile$;

  constructor(private usersService: UsersService, private firestore: Firestore) { }

  ngOnInit(): void {
  }

  get name() {
    return this.profileForm.get('name');
  }

  async submit(){
    try{
      const res = this.profileForm.value.name
      const userReff = doc(this.firestore, `users/${localStorage.getItem('userId')}`);
      await updateDoc(userReff, {displayName: res})
      alert(`Name change to ${res}`)
    } catch(err){
      alert(err)
    }
  }
}
