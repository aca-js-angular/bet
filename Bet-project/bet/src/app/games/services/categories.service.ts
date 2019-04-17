import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private db: AngularFirestore) { }

  showGame(categoryId: string) {
    return new Promise<Array<Game>>(resolve => {
      let games: Array<Game> = [];
      this.db.collection("games").snapshotChanges().subscribe(allGames => {
        allGames.filter((game: any) => {
          return game.payload.doc.data().category === categoryId;
        }).forEach((game: any) => {
          let data = game.payload.doc.data();

          this.db.collection("teams").doc(game.payload.doc.data().team_1).valueChanges().subscribe((name: any) => {
            data.t1 = name.name
          });

          this.db.collection("teams").doc(game.payload.doc.data().team_2).valueChanges().subscribe((name: any) => {
            data.t2 = name.name;
          })

          games.push(data);
        });
        resolve(games);
      });
    })

  };


  /* getAllGames() {
    return new Promise<Array<Game>>(resolve => {
      let games: Array<any> = [];
      this.db.collection('games').snapshotChanges().subscribe(ress => {
        ress.forEach(game => {
          let _game = game.payload.doc.data()
          this.db.collection('categories').doc(game.payload.doc.data()['category']).valueChanges().subscribe(res => {

            _game['categoryName'] = res['name'];

            this.db.collection('teams').doc(game.payload.doc.data()['team_1']).valueChanges().subscribe(res => {

              _game['t1'] = res['name'];

              this.db.collection('teams').doc(game.payload.doc.data()['team_2']).valueChanges().subscribe(res => {

                _game['t2'] = res['name'];
                games.push(_game);
                if (games.length === ress.length) {
                  resolve(games);
                  
                }
              })

            })

          })





        })

      })

    })
  } */
}
