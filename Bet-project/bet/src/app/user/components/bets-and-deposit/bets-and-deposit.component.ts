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
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ConfirmComponent } from '../../Confirm/confirm.component';

@Component({
  selector: 'bets-and-deposit',
  templateUrl: './bets-and-deposit.component.html',
  styleUrls: ['./bets-and-deposit.component.scss'],
})
export class BetsAndDepositComponent implements OnInit {
  animationPlay: boolean = false;
  showBet: boolean = false;
  allBets: Array<Bet> = [];
  endedBets: Array<Game> = [];
  ongoingBets: Array<Game> = [];
  newBets: Array<Game> = [];
  betsAndGames: Array<Array<object>> = [];
  currentUser: Object;
  unreadMessages: number = 0;
  details:string;
  message:string;
  
  constructor(
    private afs: AngularFirestore,
    private _auth: AngularFireAuth,
    private filtrationService: FiltrationService,
    private bets: BetsService,
    private dialog: MatDialog,
    @Inject(PopupService) private popup: PopupService
  ) { 
   
  }

  ngOnInit() {
    this.currentUser = this._auth.auth.currentUser;
    this.bets.ongoingBets = this.ongoingBets;
    
    this.filtrationService.getAllGames().then(_games => {
      this.afs.collection('bets', bet => bet.where('user', '==', this.currentUser['uid'])).valueChanges().subscribe(res => {
        this.allBets = res;
        let games: Array<Game> = _games[0];
        this.allBets.forEach(bet => {
          games.forEach(game => {
            if (bet.game === game.id && game.start_time['seconds'] * 1000 >= Date.now() && !this.ongoingBets.includes(game)) {
              
              this.ongoingBets.push(game);
              this.betsAndGames.push([bet, game]);
              
            } else if(bet.game === game.id && game.end_time['seconds'] * 1000 < Date.now() && !this.endedBets.includes(game)) {
              
              this.endedBets.push(game);

            }
          })
        })
        
        

      })
    })

    interval(30000).subscribe(() => {
      this.betsAndGames.forEach((bet_game, ind) => {
        if(bet_game[1]['end_time']['seconds']*1000 < Date.now()) {

          this.unreadMessages++;
          alert('prcav');
          this.ongoingBets.splice(ind, 1);
          this.endedBets.push(bet_game[1] as Game);
          this.animationPlay = true;
          if(bet_game[0]['odd'] === bet_game[1]['win']) {
            

            alert('krir');
            bet_game[1]['win'] = true;
            const odd = +bet_game[1]['odds'][bet_game[0]['odd']];
            const amount = bet_game[0]['amount'] * odd;
            this.bets.changeBalance(this.currentUser, amount, true);

          } else {
            bet_game[1]['win'] = false;
            alert('krvar');
          }
          this.betsAndGames.splice(ind ,1);
        }
      })
    })
    
  }

  logOut(event:any) {
    this.popup.message = 'Would you like to log out ?'
    this.popup._openConfirm(event)
  }

  openBets(): void {
    this.animationPlay = false;
    this.showBet = !this.showBet;
    if(this.showBet === true) {
      this.unreadMessages = 0;
    }
  }

  openDeposit(): void {
    this.popup._openDeposit();
  }

  deleteBet(game, event: Event): void {
    this.bets.game = game
    this.message = "Would you like cancel Bet ?"
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    this.dialog.open(ConfirmComponent, {
      data:{
        message:this.message,
        event:event,
      }
    })
    // this.bets.deleteBet(game,event,this.ongoingBets);
    
    // this.ongoingBets.forEach((_game, ind) => {
    //   if(_game.id === game.id) {
    //     this.ongoingBets.splice(ind, 1);
    //     let subscription = this.afs.collection('bets', bet => bet.where('game', '==', game.id)).snapshotChanges().subscribe(res => {
    //       this.bets.changeBalance(this.currentUser, res[0].payload.doc.data()['amount'], true);
    //       this.afs.collection('bets').doc(res[0].payload.doc.id).delete();
    //       subscription.unsubscribe();
    //     })
    //   }
    // })
  }
  
}
