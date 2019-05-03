import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LogInComponent } from '../components/log-in/log-in.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { DepositCopmponent } from '../components/bets-and-deposit/deposit.component';
import { ConfirmComponent } from 'src/app/user/Confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  message: string;
  ok: any;

  constructor(private dialog: MatDialog) { }

  _openRegistration() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    this.dialog.open(RegistrationComponent,dialogConfig);
  }

  _openSignIn() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    this.dialog.open(LogInComponent,dialogConfig);
  }

  _openDeposit(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    this.dialog.open(DepositCopmponent,dialogConfig)
  }

  _openConfirm(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    this.dialog.open(ConfirmComponent, {
      data:{
        message:this.message,
        ok:this.ok
      }
    })
  }

  _closePopup(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    this.dialog.closeAll();    
  };
}
