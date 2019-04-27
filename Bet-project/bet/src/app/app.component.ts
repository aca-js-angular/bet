import { Component, OnInit, Input } from '@angular/core';
import { AuthentificationService } from './user/services/authentification.service';
import { FiltrationService } from './games/services/filtration.service';
import { GameDetailsService } from './games/services/game-details.service';
import { Game } from './games/interfaces/game';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  randomGame:Object = {};
  constructor(
    private auth:AuthentificationService,
    private allGames: FiltrationService,
    private gameDetails: GameDetailsService,
    ){
    this.auth.checkAuthState();
   }
   ngOnInit(){
    this.allGames.getAllGames().then(res => {
      this.randomGame = res[0][(Math.floor(Math.random() * res[0].length))];
    });
   }
   betNow(game:Game){
    this.gameDetails.currentGame = game;
   }
}
