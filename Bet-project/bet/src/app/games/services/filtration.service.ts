import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})

export class FiltrationService {

  constructor(private db: AngularFirestore, private router: Router) {
  // this.db.firestore.disableNetwork()
   }

  getCategoryOfSubCategory(subCategory: string, categories: Array<object>): string {
    
    for(let cat of categories) {

      for(let subCat of cat['subCategories']) {

        if(subCat === subCategory) {
          return cat['name'];
        }

      }

    }

  }

  filterWithSubCategories(subCategory: string, categories: Array<object>, allGames: Array<Game>): Array<Game> {

    const category = this.getCategoryOfSubCategory(subCategory, categories);
    this.router.navigate([`home/${category}/${subCategory}`]);
    const games = this.filterGamesWithCategory(category, allGames);
    return games.filter(game => {
      return game['subCategoryName'] === subCategory; 
    })

  }

  filterSubCategories(categoryName?: string, filteredSubCategories?: Array<object>, allCategories?: Array<object>):Array<object> {

    for(let cat of allCategories) {

      if(categoryName === cat['name']) {
        filteredSubCategories = cat['subCategories'];
        return filteredSubCategories;
      }

    }
      
  }

  filterGamesWithCategory(categoryName: string, filteredGames: Array<Game>): Array<Game> {
    
    filteredGames = filteredGames.filter(game => {
      return game['categoryName'] === categoryName;
    })  
    return filteredGames;
  };

  getAllGames(): Promise<Array<any>> {

    return new Promise(resolve => {

      const games: Array<Array<any>> = [];
      this.db.collection('games').snapshotChanges().subscribe(res => {

        const arr: Array<any> = [];

        res.forEach(game => {
          const gameObj = game.payload.doc.data();
          gameObj['id'] = game.payload.doc.id;
          arr.push(gameObj)
        })
        games.push(arr);

        this.db.collection('teams').snapshotChanges().subscribe(res => {
          games.push(res);
          games[1].forEach((game, ind) => {

            const key = game.payload.doc.id;
            const value = game.payload.doc.data().name;
            games[1][ind] = {
              id: key,
              name: value
            };


          })

          this.db.collection('categories').snapshotChanges().subscribe(res => {

            games.push(res);
            games[2].forEach((game, ind) => {

              const key = game.payload.doc.id;
              const value = game.payload.doc.data().name;
              games[2][ind] = {
                id: key,
                name: value
              };

            })

            this.db.collection('subcategories').snapshotChanges().subscribe(res => {

              games.push(res);
              
              
              games[0].forEach(game => {

                games[1].forEach(team => {

                  if(game.team_1 === team.id) {
                    game.team1 = team.name
                  } else if(game.team_2 === team.id) {
                    game.team2 = team.name;
                  }
                })

                games[2].forEach(cat => {

                  if(game.category === cat.id) {
                    game.categoryName = cat.name;
                  }

                })

                res.forEach(subCat => {

                  if(game.type === subCat.payload.doc.id) {
                    game.subCategoryName = subCat.payload.doc.data()['name'];
                  }

                })

              })

              games[3].forEach((game, ind) => {
  
                const key = game.payload.doc.data()['category'];
                const value = game.payload.doc.data().name;
                games[3][ind] = {
                  id: key,
                  name: value
                };
  
              })

              games[2].forEach(cat => {

                const subCategories = [];
                games[3].forEach(subCat => {

                  if(subCat['id'] === cat.id) {
                    
                    subCategories.push(subCat['name']);

                  }

                })
                cat['subCategories'] = subCategories;

              })
              // console.log(games)
              resolve(games);

            })

            
          })

          

        })

      })

    })

  }
}
