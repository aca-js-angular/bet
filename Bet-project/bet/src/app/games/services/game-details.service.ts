import { Injectable } from '@angular/core';

import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameDetailsService {

  currentGame: Game;
  selectedBet: EventTarget = null;
  selectedOdd: number = null;

  constructor() { }
}
