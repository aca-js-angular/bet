import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '../interfaces/user';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) { }

  createUser(user: User) {
    return from(this.auth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(
        () => {
          let _user = {
            first_name: user.name,
            last_name: user.surname,
            balance: 1000
          }
          this.afs.collection('users').add(_user);
        }
      )
      .catch(err => console.log(err))
      );
  }
}
