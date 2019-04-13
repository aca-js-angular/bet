import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LogInService } from '../../services/log-in.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DialogContentExample } from '../../popup/dialog-content-example';

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
  forgotPassword: boolean = false;
  errorMessage: string = '';

  constructor(private loginForm: FormBuilder, private autorization: LogInService,) { }
  logForm = this.loginForm.group({
    mail: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  })

  get mail() { return this.logForm.get('mail'); }
  get password() { return this.logForm.get('password'); }

  login() {
    
    this.autorization.doLogin(this.logForm.value.mail, this.logForm.value.password).
      subscribe(
        (res) => { console.log(res), this.errorMessage = '' },///t4isht login lneluc pti gna homepage et yuserov
        (error) => { console.log(error), this.errorMessage = 'The Username or Password are Invalid' }
      )
  }

  inputsTogling() {
    this.forgotPassword = true;
    this.errorMessage = '';
    this.logForm.reset()
  }



  resetPassword() {
    this.errorMessage = '';
    this.autorization.resetPassword(this.logForm.value.mail).subscribe(
      (res) => { console.log(res), this.errorMessage = '' },///t4isht login lneluc pti gna homepage et yuserov
      (error) => { console.log(error), this.errorMessage = 'Invalid Email Address' }
    )
  }



  ngOnInit() {
  }

}
