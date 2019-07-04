import { Component, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';

import { BetsService } from '../../services/bets.service';

import { CreditCardValidator } from 'ngx-credit-cards';

@Component({
  selector: 'deposit',
  templateUrl: 'deposit.component.html',
  styleUrls: ['bets-and-deposit.component.scss']
})
export class DepositCopmponent {
    showDeposit:boolean = true;
    balance: number;
    currentUser: Object;

    depositForm = this.fb.group({
        cardNumber:["",[Validators.required, CreditCardValidator.validateCardNumber]],
        expiryDate:["",[Validators.required, CreditCardValidator.validateCardExpiry]],
        cardHoldersName:["",[Validators.required]],
        cvcNumber:["",[Validators.required, CreditCardValidator.validateCardCvc]],
        depositAmount:["",[Validators.required, Validators.min(1000)]]
    })

    constructor(
        private deposit:BetsService,
        private fb: FormBuilder,
        private _auth: AngularFireAuth,
    ){
       this.currentUser = this._auth.auth.currentUser
    }

    f() {
        console.log(this._cardNumber.errors)
    }

    get _cardNumber(){
        return this.depositForm.get("cardNumber");
    }

    get _expiryDate(){
        return this.depositForm.get("expiryDate");
    }

    get _cardHoldersName(){
        return this.depositForm.get("cardHoldersName");
    }

    get _cvcNumber(){
        return this.depositForm.get("cvcNumber");
    }

    get _depositAmount(){
        return this.depositForm.get("depositAmount");
    }

    depositBalance(){
        this.deposit.changeBalance(this.currentUser,+this._depositAmount.value,true);
    }

    withdrawlBalance(){
        this.deposit.changeBalance(this.currentUser,+this._depositAmount.value,false);
    }

    openDeposit(){
        this.showDeposit = true;
    }

    openWithdrawal(){
        this.showDeposit = false;
    }
   
}