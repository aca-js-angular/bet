import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Array<Object> = [
    {name:"All sports",quantity: 980},
    {name:"Soccer",quantity: 980},
    {name:"Basket Ball",quantity: 980},
    {name:"Tennis",quantity: 980},
    {name:"VolleyBall",quantity: 980},
    {name:"Ice Hockey",quantity: 980},
    {name:"Handball",quantity: 980},
  ]
  constructor() { }

  ngOnInit() {
  }

}
