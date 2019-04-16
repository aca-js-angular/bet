import { Component, Input } from '@angular/core';

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})

export class GamesComponent {
  @Input() games: any;
  constructor() 
  {
  }
  
}
