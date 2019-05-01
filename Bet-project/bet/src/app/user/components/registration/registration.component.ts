import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { RegistrationService } from '../../services/registration.service';
import { customValidators } from './customValidators/customValidators';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [
    trigger('stateAnimation', [
      state('start', style({})),
      transition(':enter', [
        style({ height: 0, width: 0, 'font-size': 0 }),
        animate('0.3s', style({ height: '*', width: '*', 'font-size': '18px' }))
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'scale(0)', height: 0 }))
      ]),
    ])
  ]
})
export class RegistrationComponent  {
  constructor(private fb: FormBuilder, private regService: RegistrationService, private dialog:MatDialog) {

   }

  registrForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), customValidators.upperCaseAndLowerCase, customValidators.specSymbols]],
    passwordConfirm: ['', [Validators.required]],
    recaptcha: ['', [Validators.required]]
  }, { validators: customValidators.passwordConfirmation });

  onRegistration() {
    this.regService.createUser(this.registrForm.value).subscribe(
      (res) => {this.dialog.closeAll()},
      (err) => console.log(err))
  }

  get _email() {
    return this.registrForm.get('email');
  }

  get _password() {
    return this.registrForm.get('password');
  }

  get _firstName() {
    return this.registrForm.get('firstName');
  }

  get _lastName() {
    return this.registrForm.get('lastName');
  }
  get _username() {
    return this.registrForm.get('username');
  }

  get _passwordConfirm() {
    return this.registrForm.get('passwordConfirm');
  }
 
}
