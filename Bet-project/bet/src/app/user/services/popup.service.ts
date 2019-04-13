import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LogInComponent } from '../components/log-in/log-in.component';
import { RegistrationComponent } from '../components/registration/registration.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) { }

  _openRegistration() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    const dialogRef = this.dialog.open(RegistrationComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  _openSignIn() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    const dialogRef = this.dialog.open(LogInComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
