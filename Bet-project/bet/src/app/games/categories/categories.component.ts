import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriesService } from './service/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent {

  categories: Array<Object> = []

  @Output() public games: Array<Object> = [];
  @Output() clickChange: EventEmitter<Array<Object>> = new EventEmitter();

  constructor(
    private db: AngularFirestore,
    private category: CategoriesService
  ) {
    this.db.collection("categories").snapshotChanges().subscribe((cat) => {
      return cat.forEach((c) => {
        const data = c.payload.doc.data()
        const id = c.payload.doc.id;
        return this.categories.push({ id, ...data })
      })
    })
  };


  showGames(itemId: string) {
    this.clickChange.emit(this.games);
     this.games = this.category.showGame(itemId);
     console.log(this.games);
  };
 
}
