import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { GameDetailsService } from '../../services/game-details.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BetsService } from 'src/app/user/services/bets.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  currentGame = this.gameDetails.currentGame;
  bettingAmount: boolean = false;
  currentUser: object;

  constructor(private gameDetails: GameDetailsService, 
              private auth:AngularFireAuth, 
              private afs:AngularFirestore) {  }

  ngOnInit() {

  }

  bettingAmountControl = new FormControl('',[Validators.required,Validators.min(1000)]);

  placeBet(currentUser) {
    this.currentUser = this.afs.collection('users').doc(currentUser.uid).valueChanges().subscribe(user => {
        if(user['balance'] >= this.bettingAmountControl.value) {
          const id = this.afs.createId();
          const bet = {
            amount: this.bettingAmountControl.value,
            game: this.currentGame,
            odd: this.gameDetails.selectedTeam,
            user: currentUser.uid
          }
          this.afs.collection('bets').doc(id).set(bet);
        } else {
          alert('No enough balace!');
        }
      })
  }

  showBettingAmount(event: Event) {
    if(event.target['tagName'] === 'P' && this.gameDetails.selectedBet) {
      if(event.target['parentElement']['parentElement'] === this.gameDetails.selectedBet['parentElement']) {
        this.bettingAmount = true;
      }
    } else if(event.target['tagName'] === 'DIV' && this.gameDetails.selectedBet) {
      if(event.target['parentElement'] === this.gameDetails.selectedBet['parentElement']) {
        this.bettingAmount = true;
      }
    }
  }
  
/*   bet = {
    game: this.currentGame,
    winner: 'team_1 || team_2 || draw',
    amount: 5000,
    odd: 1.5
  } */

}
