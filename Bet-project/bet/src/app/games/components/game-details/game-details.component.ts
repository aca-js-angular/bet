import { Component, OnInit, Input } from '@angular/core';

import { GameDetailsService } from '../../services/game-details.service';
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

  

/*   bet = {
    game: this.currentGame,
    winner: 'team_1 || team_2 || draw',
    amount: 5000,
    odd: 1.5
  } */

}
