import { Component, Input } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})

export class GamesComponent {
  @Input() games: any;

  
  constructor(private cat:CategoriesService) 
  {
  }
  
}