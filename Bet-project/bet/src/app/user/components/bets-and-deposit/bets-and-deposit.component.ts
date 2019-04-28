import { Component, OnInit } from '@angular/core';

import { AuthentificationService } from '../../services/authentification.service';
import { Game } from 'src/app/games/interfaces/game';
import { Bet } from '../../interfaces/bet';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'bets-and-deposit',
  templateUrl: './bets-and-deposit.component.html',
  styleUrls: ['./bets-and-deposit.component.scss']
})
export class BetsAndDepositComponent implements OnInit {

  showBet:boolean = false;
  allBets: Array<Bet> = [];
  currentUser = this._auth.auth.currentUser;
  
  constructor(private auth:AuthentificationService,
              private afs: AngularFirestore,
              private _auth:AngularFireAuth) { }

  ngOnInit() {
    this.afs.collection('bets', bet => bet.where('user', '==', this.currentUser.uid)).valueChanges().subscribe(res => {
      this.allBets = res;
    })
  }

  logOut() {
    this.auth.logOut();
  }

  openBets() {
    this.showBet = !this.showBet;
  }
}
