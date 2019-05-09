import { Component, OnInit, Input, AfterViewChecked, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthentificationService } from './user/services/authentification.service';
import { FiltrationService } from './games/services/filtration.service';
import { GameDetailsService } from './games/services/game-details.service';
import { Game } from './games/interfaces/game';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BetsService } from './user/services/bets.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  randomGame: any;
  username: string;
  balance: number;
  balanceChanged: boolean;
  previus: number;
  //@ViewChild('balanceEl') balanceEl: ElementRef;

  constructor(
    private _auth: AngularFireAuth,
    private auth: AuthentificationService,
    private afs: AngularFirestore,
    private allGames: FiltrationService,
    private gameDetails: GameDetailsService,
    private bets: BetsService
  ) {
    this.auth.checkAuthState();
  }
  ngOnInit() {

    this.allGames.getAllGames().then((res: any) => {
      this.randomGame = res[0].filter(game => {
        return (game.start_time.seconds * 1000 > new Date().getTime())
      })
      this.randomGame = this.randomGame[(Math.floor(Math.random() * this.randomGame.length))]
    });

    this._auth.authState.subscribe(user => {
      if (user) {
        this.afs.collection('users').doc(user.uid).valueChanges().subscribe(res => {
          this.balanceChanged = true;
          this.username = res['username'];
          this.balance = res['balance'];
          setTimeout(() => {
            this.balanceChanged = false;
          }, 2000);
        })
      }
    });

    console.log('ngOnInit')
  }

  betNow(game: Game, target: HTMLElement) {
    this.gameDetails.currentGame = game;
    target.scrollIntoView();
  }

}
