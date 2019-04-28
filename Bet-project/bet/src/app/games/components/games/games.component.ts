import { Component, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

import { GameDetailsService } from '../../services/game-details.service';
import { FiltrationService } from '../../services/filtration.service';

import { Game } from '../../interfaces/game';

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})

export class GamesComponent implements OnInit {

  
  greenPicture:string='Green';
  selectedDayFromCalendar: number = Date.now();

  categories: Array<Object> = []
  allGames: Array<Game> = [];
  filteredGames: Array<Game> = [];
  allSubCategories: Array<object> = [];
  filteredSubCategories: Array<any> = [];
  currentSubCategory: string;
  currentCategory: string;
  nextHours: number = 500000000000;

  showGameDetails: boolean = false;

  constructor(
    
    private filtrationService: FiltrationService,
    private gameDetails: GameDetailsService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
    // this.afs.firestore.disableNetwork();
  }

  getCurrentGame(game: Game): void {
    this.gameDetails.currentGame = game;
  }

  selectTime(selectedTime): void {
    this.nextHours = selectedTime;
    this.selectedDayFromCalendar = Date.now();
  }

  ngOnInit() {
    
    this.filtrationService.getAllGames().then(res => {
      this.categories = res[2];
      this.allGames = res[0];
      this.filteredGames = this.allGames
      this.allSubCategories = res[3];
      this.allSubCategories.forEach(a => this.filteredSubCategories.push(a['name']));
      this.activeRoute.params.subscribe(params => {

        if (params.category && !params.subCategory) {

          this.currentCategory = params.category;
          this.filteredSubCategories = this.filtrationService.filterSubCategories(params.category, this.filteredSubCategories, this.categories);
          this.filteredGames = this.filtrationService.filterGamesWithCategory(params.category, this.allGames);
          this.currentCategory = params.category

        }
          if (params.category && params.subCategory) {
          this.currentSubCategory = params.subCategory;
          this.filteredSubCategories = this.filtrationService.filterSubCategories(params.category, this.filteredSubCategories, this.categories);
          this.filteredGames = this.filtrationService.filterWithSubCategories(params.subCategory, this.categories, this.allGames);
          this.currentCategory = params.category
        }
        else if(!params.category && !params.subCategory){
          this.currentCategory = "allSports";
        }
        
        if(params.team1 && params.team2) {
          this.showGameDetails = true;
        }
      });
    
    });
  }

  showGamesWithCategory(categoryName: string) {
    if(categoryName == 'allSports'){
      this.router.navigate([`home/`]);
      
    }
    else {
      this.router.navigate([`home/${categoryName}`]);
    } 
  };

  showGamesWithSubCategory(subCatName: string) {
    this.filteredGames = this.filtrationService.filterWithSubCategories(subCatName, this.categories, this.allGames)
  };
  selectDay(selectedDay){
    this.selectedDayFromCalendar = selectedDay
  }
}
