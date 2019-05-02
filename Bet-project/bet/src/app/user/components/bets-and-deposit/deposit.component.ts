import { Component, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthentificationService } from '../../services/authentification.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'deposit',
  templateUrl: 'deposit.component.html',
  styleUrls: ['bets-and-deposit.component.scss']
})
export class DepositCopmponent {
    showDeposit:boolean = true;
    depositForm = this.fb.group({
        cardNumber:[""],
        expiryDateMM:[""],
        expiryDateYY:[""],
        cardHoldersName:[""],
        cvcNumber:[""],
        depositAmount:[""]
    })
    balance: number;

    constructor(
        private _auth: AngularFireAuth,
        private auth:AuthentificationService,
        private afs: AngularFirestore,
        private fb: FormBuilder,
    ){
       
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
        
    }
    withdrawlBalance(){
       
    }

    opneDeposit(){
        this.showDeposit = true;
    }
    opneWithdrawal(){
        this.showDeposit = false;
    }
   
}