import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { LogInComponent } from '../components/log-in/log-in.component';
import { RegistrationComponent } from '../components/registration/registration.component';

import { PopupService } from '../services/popup.service';

@Component({
  selector: 'dialog-content-example',
  templateUrl: 'dialog-content-example.html',
  styleUrls:['dialog-content-example.scss'],
})
export class DialogContentExample {
  constructor(private dialog: MatDialog, private popup: PopupService){}

  openRegistration() {
    this.popup._openRegistration();
  }
  
  openSignIn() {
    this.popup._openSignIn();
  }
}
