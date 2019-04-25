import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss']
})
export class BetsComponent implements OnInit {
 @Output() game:Array<Object> = [{
   category: "Soccer",
   endTime: {
     seconds: 1556386200,
     nanoseconds: 0
   },
   odds:{
     draw: 3.25,
     team_1: 1.5,
     team_2:3.2
   },
   start_time:1556382600,
   subcategory: "EPL",
   team1:"Brighton and Hove Albion",
   team2: "Newcastle United",
 },
 {
  category: "Soccer",
  endTime: {
    seconds: 1556173391234234,
    nanoseconds: 0
  },
  odds:{
    draw: 3.25,
    team_1: 1.5,
    team_2:3.2
  },
  start_time:1556382600,
  subcategory: "EPL",
  team1:"Brighton and Hove Albion",
  team2: "Newcastle United",
},
];
  ongoing:Array<Object> = [];
  ended:Array<Object> = [];
  constructor() { }

  ngOnInit() {
    this.game.forEach((i:any)=>{
      if(i.endTime.seconds < Date.now()){
        this.ended.push(i);
      }else {
        this.ongoing.push(i);
      }
    })
  }

}
