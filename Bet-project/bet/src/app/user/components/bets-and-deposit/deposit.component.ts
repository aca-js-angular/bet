import { Component } from '@angular/core';

@Component({
  selector: 'deposit',
  templateUrl: 'deposit.component.html',
  styleUrls: ['bets-and-deposit.component.scss']
})
export class DepositCopmponent {
    showDeposit:boolean = true;

    constructor(){ }

    opneDeposit(){
        this.showDeposit = true;
    }
    opneWithdrawal(){
        this.showDeposit = false;
    }
   
}