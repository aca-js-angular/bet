import { Component, OnInit, Inject, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthentificationService } from '../services/authentification.service';
import { BetsService } from '../services/bets.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  message: string
  event:any;
  ok:Function;
  constructor(
    @Inject(
      MAT_DIALOG_DATA) public data: any,
    private auth: AuthentificationService,
    private dialog: MatDialog,
    private bets:BetsService) {
    this.message = this.data.message;
    this.event = this.data.event;
    this.ok = this.data.ok
  }

  ngOnInit() {
  }
  confirmFunction() {
      if(this.event.target.className === 'del'){
        this.bets.deleteBet(this.bets.game,this.event,this.bets.ongoingBets)
      }
      else{
      this.auth.logOut()
    }
    this.dialog.closeAll()
}
}
