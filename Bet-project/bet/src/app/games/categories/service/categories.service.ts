import { Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private db: AngularFirestore) { }

 showGame(itemId: string) {
    let games: Array<Object> = [];
    this.db.collection("games").snapshotChanges().subscribe(a => {
      a.filter((i: any) => {
        return i.payload.doc.data().category === itemId;
      }).forEach((i:any) => {
        let data = i.payload.doc.data();
        this.db.collection("teams").doc(i.payload.doc.data().team_1).valueChanges().subscribe((name:any)=> {
         data.t1 = name.name
        });
        this.db.collection("teams").doc(i.payload.doc.data().team_2).valueChanges().subscribe((name:any)=>{
          data.t2 = name.name;
        })
        games.push(data);
      });
    });
    return games
  };

   getAllgame(){
    this.db.collection("games").snapshotChanges().subscribe((game) =>{
      let games: Array<Object> = [];
      game.forEach((i:any)=>{
        let data = i.payload.doc.data();
        this.db.collection("teams").doc(i.payload.doc.data().team_1).valueChanges().subscribe((name:any)=> {
         data.t1 = name.name
        });
        this.db.collection("teams").doc(i.payload.doc.data().team_2).valueChanges().subscribe((name:any)=>{
          data.t2 = name.name;
        });
        games.push(data);
      });
      return games;
    });
   }
}
