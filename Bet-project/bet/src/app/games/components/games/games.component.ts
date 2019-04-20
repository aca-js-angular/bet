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

  categories: Array<Object> = []
  allGames: Array<Game> = [];
  filteredGames: Array<Game> = [];
  
  availableGames: string = "upcomingGames";

  constructor(private afs: AngularFirestore,
    private category: CategoriesService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
     this.afs.firestore.disableNetwork();


  }

  ngOnInit() {

    this.category.getAllGames().then(res => {
      this.categories = res[2];
      this.allGames = res[0];
      console.log(res)
      this.activeRoute.params.subscribe(params => {
        if (params.category) {
          this.filteredGames = this.category.filterGamesWithCategory(params.category, this.allGames);
        }
      })

    })
  }
  showGames(categoryName) {
    this.router.navigate([`home/${categoryName}`]);
  };

}
