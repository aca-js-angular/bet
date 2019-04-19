import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private db: AngularFirestore, private router: Router) {
    this.db.firestore.disableNetwork()
   }

  filterGamesWithCategory(categoryName: string, filteredGames: Array<Game>) {
    // console.log(filteredGames);
    
    filteredGames = filteredGames.filter(game => {
      return game.categoryName === categoryName;
    })
    return filteredGames;
    
  };

  getAllGames(): Promise<Array<any>> {

    return new Promise(resolve => {

      let games: Array<Array<any>> = [];
      this.db.collection('games').valueChanges().subscribe(res => {

        games.push(res);

        this.db.collection('teams').snapshotChanges().subscribe(res => {
          games.push(res);
          games[1].forEach((game, ind) => {

            let key = game.payload.doc.id;
            let value = game.payload.doc.data().name;
            games[1][ind] = {
              id: key,
              name: value
            };


          })

          this.db.collection('categories').snapshotChanges().subscribe(res => {

            games.push(res);
            games[2].forEach((game, ind) => {

              let key = game.payload.doc.id;
              let value = game.payload.doc.data().name;
              games[2][ind] = {
                id: key,
                name: value
              };

            })

            this.db.collection('subcategories').snapshotChanges().subscribe(res => {

              games.push(res);
              games[3].forEach((game, ind) => {
  
                let key = game.payload.doc.id;
                let value = game.payload.doc.data().name;
                games[3][ind] = {
                  id: key,
                  name: value
                };
  
              })
              
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

                games[3].forEach(subCat => {

                  if(game.type === subCat.id) {
                    game.subCategory = subCat.name;
                    
                  }

                })

              })

              resolve(games);

            })

            
          })

          

        })

      })

    })

  }
}
