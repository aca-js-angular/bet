import { Component, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthentificationService } from '../../services/authentification.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { BetsService } from '../../services/bets.service';

@Component({
  selector: 'deposit',
  templateUrl: 'deposit.component.html',
  styleUrls: ['bets-and-deposit.component.scss']
})
export class DepositCopmponent {
    showDeposit:boolean = true;
    depositForm = this.fb.group({
        cardNumber:["",[Validators.required, Validators.minLength(2)]],
        expiryDateMM:["",[Validators.required, Validators.minLength(2)]],
        expiryDateYY:["",[Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
        cardHoldersName:["",[Validators.required]],
        cvcNumber:["",[Validators.required, Validators.maxLength(3)]],
        depositAmount:["",[Validators.required, Validators.min(1000)]]
    })
    balance: number;
    currentUser: Object;
    constructor(
        private deposit:BetsService,
        private fb: FormBuilder,
        private _auth: AngularFireAuth,
    ){
       this.currentUser = this._auth.auth.currentUser
     }
     get _cardNumber(){
        return this.depositForm.get("cardNumber")
    }
    get _expiryDateMM(){
        return this.depositForm.get("expiryDateMM")
    }
    get _expiryDateYY(){
        return this.depositForm.get("expiryDateYY")
    }
    get _cardHoldersName(){
        return this.depositForm.get("cardHoldersName")
    }
    get cvcNumber(){
        return this.depositForm.get("cvcNumber")
    }
     get _depositAmount(){
         return this.depositForm.get("depositAmount")
    }
    depositBalance(){
        this.deposit.changeBalance(this.currentUser,+this.depositForm.get('depositAmount').value,true)
    }
    withdrawlBalance(){
        this.deposit.changeBalance(this.currentUser,+this.depositForm.get('depositAmount').value,false)
       
    }

    openDeposit(){
        this.showDeposit = true;
    }
    openWithdrawal(){
        this.showDeposit = false;
    }
   
}