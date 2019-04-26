import { Component, OnInit, Input } from '@angular/core';

import { GameDetailsService } from '../../services/game-details.service';
import { Game } from '../../interfaces/game';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  currentGame = this.gameDetails.currentGame;
  bettingAmount: boolean = false;

  constructor(private gameDetails: GameDetailsService) { }

  ngOnInit() {

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
