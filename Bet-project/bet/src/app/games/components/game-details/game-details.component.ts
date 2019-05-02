import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild("scroll") scrollDiv: ElementRef;



  currentGame = this.gameDetails.currentGame;
  bettingAmount: boolean = false;
  currentUser: object;
  id: string;
  betUp: boolean = false;
  betDown: boolean = false;
  constructor(private gameDetails: GameDetailsService,
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private bets: BetsService) {
    this.id = this.currentGame.id
  }

  ngOnInit() {
    this.scrollDiv.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    this.afs.collection('games').doc(this.id).snapshotChanges().subscribe((game: any) => {
      for (let key in this.currentGame.odds) {
        for (let k in this.currentGame.odds[key]) {
          if (game.payload.data().odds[key][k] < this.currentGame.odds[key][k]) {
            this.betDown = true
          } else if (game.payload.data().odds[key][k] > this.currentGame.odds[key][k]) {
            this.betUp = true
          }
          this.currentGame.odds[key][k] = game.payload.data().odds[key][k];
        }
      }
    });
  }

  bettingAmountControl = new FormControl('', [Validators.required, Validators.min(1000)]);

  placeBet(currentUser) {
    let subscription = this.afs.collection('users').doc(currentUser.uid).valueChanges().subscribe(user => {
      if (user['balance'] >= this.bettingAmountControl.value) {
        this.bets.balance = user['balance'];
        const id = this.afs.createId();
        const bet = {
          amount: this.bettingAmountControl.value,
          game: this.currentGame['id'],
          odd: this.gameDetails.selectedTeam,
          user: currentUser.uid
        }
        this.afs.collection('bets').doc(id).set(bet);
        this.bets.newBets.push(this.currentGame);
        this.bets.changeBalance(currentUser, this.bettingAmountControl.value, false);
        subscription.unsubscribe();
      }
    })

  }

  showBettingAmount(event: Event) {
    if (event.target['tagName'] === 'P' && this.gameDetails.selectedBet) {
      if (event.target['parentElement']['parentElement'] === this.gameDetails.selectedBet['parentElement']) {
        this.bettingAmount = true;
      }
    } else if (event.target['tagName'] === 'DIV' && this.gameDetails.selectedBet) {
      if (event.target['parentElement'] === this.gameDetails.selectedBet['parentElement']) {
        this.bettingAmount = true;
      }
    }
  }



}
