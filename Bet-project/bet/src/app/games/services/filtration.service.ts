import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Game } from '../interfaces/game';
import { Datas } from '../interfaces/datas';

@Injectable({
  providedIn: 'root'
})

export class FiltrationService {

  constructor(private db: AngularFirestore, private router: Router) {
    // this.db.firestore.disableNetwork()
  }

  getCategoryOfSubCategory(subCategory: string, categories: Array<object>): string {

    for (let cat of categories) {

      for (let subCat of cat['subCategories']) {

        if (subCat === subCategory) {
          return cat['name'];
        }

      }

    }

  }

  filterWithSubCategories(subCategory: string, categories: Array<object>, allGames: Array<Game>): Array<Game> {

    let category = this.getCategoryOfSubCategory(subCategory, categories);
    this.router.navigate([`home/${category}/${subCategory}`]);
    let games = this.filterGamesWithCategory(category, allGames);
    return games.filter(game => {
      return game['subCategoryName'] === subCategory;
    })

  }

  filterSubCategories(categoryName?: string, filteredSubCategories?: Array<object>, allCategories?: Array<object>): Array<object> {

    for (let cat of allCategories) {

      if (categoryName === cat['name']) {
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

  getAllGames(): Promise<Datas> {

    return new Promise(resolve => {


      this.db.collection('games').snapshotChanges().subscribe(res => {

        let datas: Datas = {
          allGames: [],
          teams: [],
          categories: [],
          subcategories: []
        };

        let arr: Array<any> = [];
        res.forEach(game => {
          let gameObj = game.payload.doc.data();
          gameObj['id'] = game.payload.doc.id;
          arr.push(gameObj)
        })
        datas.allGames = arr;
        this.db.collection('teams').snapshotChanges().subscribe(res => {
          datas.teams = res;
          datas.teams.forEach((game, ind) => {
            let key = game.payload.doc.id;
            let value = game.payload.doc.data().name;
            datas.teams[ind] = {
              id: key,
              name: value
            };
          });
          this.db.collection('categories').snapshotChanges().subscribe(res => {
            datas.categories = res;
            datas.categories.forEach((game, ind) => {
              let key = game.payload.doc.id;
              let value = game.payload.doc.data().name;
              datas.categories[ind] = {
                id: key,
                name: value
              };
            })
            this.db.collection('subcategories').snapshotChanges().subscribe(res => {
              datas.subcategories = res;
              datas.allGames.forEach(game => {
                datas.teams.forEach(team => {
                  if (game.team_1 === team.id) {
                    game.team1 = team.name
                  } else if (game.team_2 === team.id) {
                    game.team2 = team.name;
                  }
                })
                datas.categories.forEach(cat => {
                  if (game.category === cat.id) {
                    game.categoryName = cat.name;
                  }
                })
                res.forEach(subCat => {
                  if (game.type === subCat.payload.doc.id) {
                    game.subCategoryName = subCat.payload.doc.data()['name'];
                  }
                })
              })
              datas.subcategories.forEach((game, ind) => {
                let key = game.payload.doc.data()['category'];
                let value = game.payload.doc.data().name;
                datas.subcategories[ind] = {
                  id: key,
                  name: value
                };
              })
              datas.categories.forEach(cat => {
                let subCategories = [];
                datas.subcategories.forEach(subCat => {
                  if (subCat['id'] === cat.id) {
                    subCategories.push(subCat['name']);
                  }
                })
                cat['subCategories'] = subCategories;
              })
              resolve(datas);
            })
          })
        })
      })
    })
  }
}
