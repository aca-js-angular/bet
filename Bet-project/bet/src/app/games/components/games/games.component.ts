import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriesService } from '../../services/categories.service';
import { Game } from '../../interfaces/game';

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})

export class GamesComponent implements OnInit {

  sxmacSubcategoriID = '';
  sxmaccategori = '';

  categories: Array<Object> = []
  allGames: Array<Game> = [];
  filteredGames: Array<Game> = [];
  allSubCategories: Array<object> = [];
  filteredSubCategories: Array<any> = [];
  
  availableGames: string = "upcomingGames";

  constructor(private afs: AngularFirestore,
    private categoryService: CategoriesService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
      this.afs.firestore.disableNetwork();
  }

  ngOnInit() {

    this.categoryService.getAllGames().then(res => {
      this.categories = res[2];
      this.allGames = res[0];
      this.allSubCategories = res[3];
      console.log(this.allSubCategories)
      this.allSubCategories.forEach(a => this.filteredSubCategories.push(a['name']));
      this.activeRoute.params.subscribe(params => {

        if(params.category && !params.subCategory) {

          this.filteredSubCategories = this.categoryService.filterSubCategories(params.category,this.filteredSubCategories,this.categories);
          this.filteredGames = this.categoryService.filterGamesWithCategory(params.category, this.allGames);
          
        }else if(params.category && params.subCategory) {

          this.filteredSubCategories = this.categoryService.filterSubCategories(params.category,this.filteredSubCategories,this.categories);
          this.filteredGames = this.categoryService.filterWithSubCategories(params.subCategory, this.categories, this.allGames);
        }
        
      })
    })    

    
  }

  showGamesWithCategory(categoryName: string) {
    
  this.router.navigate([`home/${categoryName}`]);
   
    
    
   
  };

  showGamesWithSubCategory(subCatName: string) {
    this.filteredGames = this.categoryService.filterWithSubCategories(subCatName, this.categories, this.allGames)
    
    // this.router.navigate([`home/${this.sxmaccategori}/${this.sxmacSubcategoriID}`]);
   
  };
  
}
