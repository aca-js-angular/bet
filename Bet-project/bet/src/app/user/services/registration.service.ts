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
        (u) => {
          this.afs.collection('users').doc(u.user.uid).set({
            first_name: user.firstName,
            last_name: user.lastName,
            balance: 10000,
            username: user.username,
          });
        }
      )
      .catch(err => console.log(err))
      );
  }
 
}
