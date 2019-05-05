import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from 'src/app/games/interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  username: string;
  balance: number;
  newBets: Array<any> = [];
  ongoingBets: Array<Game> = [];
  game:Game;

  constructor(private fireAuth: AngularFireAuth, private afs:AngularFirestore) {

  }

  changeBalance(user, amount, bool) {
    let currentUser;
    let subscription = this.afs.collection('users').doc(user.uid).valueChanges().subscribe(_user => {
      currentUser = _user;
      if(bool) {
        _user['balance'] += amount;
        const __user = {
          balance: _user['balance']
        }
        this.afs.collection('users').doc(user.uid).update(__user);
        subscription.unsubscribe();
      } else {
        _user['balance'] -= amount;
        const __user = {
          balance: _user['balance']
        }
        this.afs.collection('users').doc(user.uid).update(__user);
        subscription.unsubscribe();
      }
    })
  
  }
  deleteBet(game,event,ongoingBets){
    event.stopPropagation();
    ongoingBets.forEach((_game, ind) => {
      if(_game.id === game.id) {
        ongoingBets.splice(ind, 1);
        let subscription = this.afs.collection('bets', bet => bet.where('game', '==', game.id)).snapshotChanges().subscribe(res => {
          this.changeBalance(this.fireAuth.auth.currentUser, res[0].payload.doc.data()['amount'], true);
          this.afs.collection('bets').doc(res[0].payload.doc.id).delete();
          subscription.unsubscribe();
        })
      }
    })
  }
}
