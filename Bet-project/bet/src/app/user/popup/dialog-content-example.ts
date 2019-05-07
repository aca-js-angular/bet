import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { LogInService } from '../services/log-in.service';
import { RegistrationComponent } from '../components/registration/registration.component';
import { LogInComponent } from '../components/log-in/log-in.component';

@Component({
  selector: 'dialog-content-example',
  templateUrl: 'dialog-content-example.html',
  styleUrls:['dialog-content-example.scss'],
})
export class DialogContentExample {
  constructor(private dialog: MatDialog,private login:LogInService){}

  openRegistration() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    this.dialog.open(RegistrationComponent,dialogConfig);
  }
  
  openSignIn() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      this.dialog.open(LogInComponent,dialogConfig);
  }
}
