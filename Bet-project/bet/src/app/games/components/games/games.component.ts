import { Component, OnInit, } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

import { GameDetailsService } from '../../services/game-details.service';
import { FiltrationService } from '../../services/filtration.service';

import { Game } from '../../interfaces/game';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})

export class GamesComponent implements OnInit {
  notloaded: boolean = true;
  lentghs: number[] = [];
  greenPicture: string = 'Green';
  selectedDayFromCalendar: any;

  categories: Array<Object> = []
  allGames: Array<Game> = [];
  filteredGames: Array<Game> = [];
  allSubCategories: Array<object> = [];
  filteredSubCategories: Array<any> = [];
  currentSubCategory: string;
  currentCategory: string;
  nextHours: any;
  showGameDetails: boolean = false;

  params: any;

  hoursSelect: object[] = [
    { value: 3, text: "Next 3 Hours" },
    { value: 5, text: "Next 5 Hours" },
    { value: 6, text: "Next 6 Hours" },
    { value: 24, text: "Next 24 Hours" },
    { value: 500000000000, text: "Next 30 Hours" },
  ]

  constructor(
    private timeService: TimeService,
    private filtrationService: FiltrationService,
    private gameDetails: GameDetailsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private afs: AngularFirestore) {
    // this.afs.firestore.disableNetwork();

  }

  getCurrentGame(game: Game): void {
    this.gameDetails.currentGame = game;
  }


  ngOnInit() {


 




      //////////////////////////////////////////////////////////////////////
      this.selectedDayFromCalendar = this.timeService.dayfromCalendar;
      this.nextHours = this.timeService.nextHours.hours;
  
      this.filtrationService.getAllGames().then(res => {
        this.notloaded = false;
        
        this.categories = res.categories;
        this.allGames = res.allGames;
        this.filteredGames = this.allGames;
  
        this.allSubCategories = res.subcategories;
        this.allSubCategories.forEach(a => this.filteredSubCategories.push(a['name']));
        this.activeRoute.params.subscribe(params => {
  
          if (params.id) {
            this.params = params;
            for (let i = 0; i < this.allGames.length; i++) {
              if (this.allGames[i].id === params.id) {
                break;
              }
              if (i === this.allGames.length - 1) {
                this.router.navigate(['**']);
              }
            }
          }
  
          if (params.category && !params.subCategory) {
  
            this.filteredSubCategories = this.filtrationService.filterSubCategories(params.category, this.filteredSubCategories, this.categories);
            this.filteredGames = this.filtrationService.filterGamesWithCategory(params.category, this.allGames);
            this.currentCategory = params.category;
  
            for(let i = 0; i < this.categories.length; i++) {
              if(this.categories[i]['name'] === params.category) {
                break;
              }
              if(i === this.categories.length - 1) {
                this.router.navigate(['**']);
              }
            }
  
          }
          if (params.category && params.subCategory) {
  
            this.currentSubCategory = params.subCategory;
            this.currentCategory = params.category;
            this.filteredSubCategories = this.filtrationService.filterSubCategories(params.category, this.filteredSubCategories, this.categories);
            this.filteredGames = this.filtrationService.filterWithSubCategories(params.subCategory, this.categories, this.allGames);
  
            for(let i = 0; i < this.categories.length; i++) {
              if(this.categories[i]['name'] === params.category) {
                break;
              }
              if(i === this.categories.length - 1) {
                this.router.navigate(['**']);
              }
            }
  
            for(let i = 0; i < this.allSubCategories.length; i++) {
              if(this.allSubCategories[i]['name'] === params.subCategory) {
                break;
              }
              if(i === this.allSubCategories.length - 1) {
                this.router.navigate(['**']);
              }
            }
          }
          else if (!params.category && !params.subCategory) {
            this.currentCategory = "allSports";
          }
  
        });
  
      });

    


  }

  showGamesWithCategory(categoryName: string) {
    if (categoryName == 'allSports') {
      this.router.navigate([`home/`]);
    }
    else {
      this.router.navigate([`home/${categoryName}`]);
    }
  };

  showGamesWithSubCategory(subCatName: string) {
    this.filteredGames = this.filtrationService.filterWithSubCategories(subCatName, this.categories, this.allGames)
  };

  selectTime(selectedTimeHours): void {
    this.nextHours = this.timeService.selectTime(selectedTimeHours)
    this.selectedDayFromCalendar.day = 0;
  }

}
