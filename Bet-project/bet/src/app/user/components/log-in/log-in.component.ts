import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LogInService } from '../../services/log-in.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PopupService } from '../../services/popup.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RegistrationComponent } from '../registration/registration.component';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  animations: [
    trigger('stateAnimation', [
      state('start', style({})),
      transition(':enter', [
        style({ height: 0, width: 0, 'font-size': 0 }),
        animate('0.3s', style({ height: '*', width: '*', 'font-size': '18px' }))
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'scale(0)' }))
      ]),
    ])
  ]
})
export class LogInComponent implements OnInit {

  state: string = "login";
  errorMessage: string = '';
  checked: boolean = false;

  constructor(private fb: FormBuilder, private autorization: LogInService, private dialog: MatDialog) { }

  logForm = this.fb.group({
    mail: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  forgotPasswordForm = this.fb.group({
    mail: ['', [Validators.required]],
  })

  get mail() { return this.logForm.get('mail'); }
  get password() { return this.logForm.get('password'); }

  login() {
    this.autorization.doLogin(this.logForm.value.mail, this.logForm.value.password, this.checked).
      subscribe(
        (res) => { this.dialog.closeAll(), this.errorMessage = '' },
        (error) => { console.log(error), this.errorMessage = 'The Username or Password are Invalid' }
      )
  }



  resetPassword() {
    this.autorization.resetPassword(this.forgotPasswordForm.value.mail).subscribe(
      (res) => { this.dialog.closeAll(), this.errorMessage = '' },///t4isht login lneluc pti gna homepage et yuserov
      (error) => { this.errorMessage = 'Invalid Email Address' }
    )
  }

  openRegistationPage() {
    this.dialog.closeAll()
    // this.autorization._openRegistration()
     const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    this.dialog.open(RegistrationComponent,dialogConfig);
  }



  ngOnInit() {
  }

}
