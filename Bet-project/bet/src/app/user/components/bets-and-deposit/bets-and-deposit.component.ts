import { Component, OnInit, Inject } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'bets-and-deposit',
  templateUrl: './bets-and-deposit.component.html',
  styleUrls: ['./bets-and-deposit.component.scss']
})
export class BetsAndDepositComponent implements OnInit {
  showDeposit:boolean = false;
  gamesBet:Array<Object> = [{
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
  showBet:boolean = false;
  constructor(private auth:AuthentificationService,@Inject(PopupService) private popup:PopupService) { }

  ngOnInit() {
    this.gamesBet.forEach((i:any)=>{
      if(i.endTime.seconds < Date.now()){
        this.ended.push(i);
      }else {
        this.ongoing.push(i);
      }
    });
  }
  logOut(){
    this.auth.logOut();
  }
  openBets(){
    this.showBet = !this.showBet;
  }
  openDeposit(){
    this.popup._openDeposit();
  }
}
