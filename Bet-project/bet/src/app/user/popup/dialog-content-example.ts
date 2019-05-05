import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { PopupService } from '../services/popup.service';
import { LogInService } from '../services/log-in.service';

@Component({
  selector: 'dialog-content-example',
  templateUrl: 'dialog-content-example.html',
  styleUrls:['dialog-content-example.scss'],
})
export class DialogContentExample {
  constructor(private dialog: MatDialog, private popup: PopupService,private login:LogInService){}

  openRegistration() {
    this.login._openRegistration();
  }
  
  openSignIn() {
    this.popup._openSignIn();
  }
}
