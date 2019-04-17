import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent {

  categories: Array<Object> = []

  @Output() public games: any = [];
  @Output() clickChange: EventEmitter<Array<Object>> = new EventEmitter();

  constructor(
    private db: AngularFirestore,
    private category: CategoriesService,
    private route: Router
  ) {
    this.db.collection("categories").snapshotChanges().subscribe((cat) => {
      return cat.forEach((c) => {
        const data = c.payload.doc.data()
        const id = c.payload.doc.id;
        return this.categories.push({ id, ...data })
      });
    });
  };

  showGames(categoryId: string) {
    this.clickChange.emit(this.games);
    this.category.showGame(categoryId).then(res => {
      this.route.navigate([`games/${categoryId}`]);
      this.games = res;
      console.log(res);
    });
  };

}
