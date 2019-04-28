import { Component, OnInit, Input } from '@angular/core';
import { AuthentificationService } from './user/services/authentification.service';
import { FiltrationService } from './games/services/filtration.service';
import { GameDetailsService } from './games/services/game-details.service';
import { Game } from './games/interfaces/game';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  randomGame:Object = {};
  username: string;
  balance: number;

  constructor(
    private _auth: AngularFireAuth,
    private auth:AuthentificationService,
    private afs: AngularFirestore,
    private allGames: FiltrationService,
    private gameDetails: GameDetailsService,
    ){
    this.auth.checkAuthState();
   }
   ngOnInit(){
    this.allGames.getAllGames().then(res => {
      this.randomGame = res[0][(Math.floor(Math.random() * res[0].length))];
    });
  
    this._auth.authState.subscribe(user => {
      if(user) {
        this.afs.collection('users').doc(user.uid).valueChanges().subscribe(res => {
          this.username = res['username'];
          this.balance = res['balance'];
        })
      }
    });    
   }
   betNow(game:Game){
    this.gameDetails.currentGame = game;
   }
}
