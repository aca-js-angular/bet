import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  username: string;
  balance: number;

  constructor(private fireAuth: AngularFireAuth, private afs:AngularFirestore) {

  }

  changeBalance(user, amount, bool) {
    let currentUser;
    console.log(user)
    this.afs.collection('users').doc(user.uid).valueChanges().subscribe(_user => {
      currentUser = _user;
      if(bool) {
        _user['balance'] += amount;
        const __user = {
          balance: _user['balance']
        }
        this.afs.collection('users').doc(user.uid).update(__user);
      } else {
        _user['balance'] -= amount;
        const __user = {
          balance: _user['balance']
        }
        this.afs.collection('users').doc(user.uid).update(__user);
      }
    })
  
  }
}
