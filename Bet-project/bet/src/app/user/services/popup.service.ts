import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LogInComponent } from '../components/log-in/log-in.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { DepositCopmponent } from '../components/bets-and-deposit/deposit.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  message: string;
  ok: Function;

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
  _closePopup(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    this.dialog.closeAll();    
  };
}
