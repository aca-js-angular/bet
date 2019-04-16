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
        let team1 = i.payload.doc.data().team_1;
        let team2 = i.payload.doc.data().team_2;
        this.db.collection("teams").doc(team1).valueChanges().subscribe((name:any)=> {
         data.t1 = name.name
        });
        this.db.collection("teams").doc(team2).valueChanges().subscribe((name:any)=>{
          data.t2 = name.name;
        })
        games.push(data);
    
      });
    });
    return games
  };
}
