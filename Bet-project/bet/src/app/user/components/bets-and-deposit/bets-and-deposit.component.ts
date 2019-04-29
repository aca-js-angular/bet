import { Component, OnInit, Inject } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { PopupService } from '../../services/popup.service';

import { Game } from 'src/app/games/interfaces/game';
import { Bet } from '../../interfaces/bet';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FiltrationService } from 'src/app/games/services/filtration.service';
import { BetsService } from '../../services/bets.service';
import { interval } from 'rxjs';

@Component({
  selector: 'bets-and-deposit',
  templateUrl: './bets-and-deposit.component.html',
  styleUrls: ['./bets-and-deposit.component.scss']
})
export class BetsAndDepositComponent implements OnInit {

  showBet: boolean = false;
  allBets: Array<Bet> = [];
  endedBets: Array<Game> = [];
  ongoingBets: Array<Game> = [];
  newBets: Array<Game> = [];
  betsAndGames: Array<Array<object>> = [];
  currentUser: Object;
  win: boolean = true;

  constructor(
    private auth: AuthentificationService,
    private afs: AngularFirestore,
    private _auth: AngularFireAuth,
    private filtrationService: FiltrationService,
    private bets: BetsService,
    @Inject(PopupService) private popup: PopupService
  ) { }

  ngOnInit() {
    this.currentUser = this._auth.auth.currentUser;
    this.filtrationService.getAllGames().then(_games => {
      this.afs.collection('bets', bet => bet.where('user', '==', this.currentUser['uid'])).valueChanges().subscribe(res => {
        this.allBets = res;
        let games: Array<Game> = _games[0];
        this.allBets.forEach(bet => {
          games.forEach(game => {
            if (bet.game === game.id && game.end_time['seconds'] * 1000 >= Date.now() && !this.ongoingBets.includes(game)) {

              this.ongoingBets.push(game);
              this.betsAndGames.push([bet, game]);
              
            }
          })
        })
        let subscription = interval(30000).subscribe(() => {
          this.betsAndGames.forEach((bet_game, ind) => {
            if(bet_game[1]['end_time']['seconds']*1000 < Date.now()) {
              alert('prcav')
              this.ongoingBets.splice(ind, 1);
              this.endedBets.push(bet_game[1] as Game);
              if(bet_game[0]['odd'] === bet_game[1]['win']) {
                alert('krir');
                const odd = bet_game[1][bet_game[0]['odd']];
                const amount = bet_game[0]['amount'] * odd;
                this.bets.changeBalance(this.currentUser, amount, true);
              } else {
                alert('krvar');
                
              }
              subscription.unsubscribe();
            }
          })
        })

      })
    })
    
  }

  logOut() {
    this.auth.logOut();
  }

  openBets() {
    this.showBet = !this.showBet;
  }

  openDeposit() {
    this.popup._openDeposit();
  }
}
