import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { LogInComponent } from './components/log-in/log-in.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from './popup/material.module';
import { BetsAndDepositComponent } from './components/bets-and-deposit/bets-and-deposit.component';
import { DepositCopmponent } from './components/bets-and-deposit/deposit.component';
import { ConfirmDirective } from '../Confirm/confirmDirective/confirm.directive';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    UserRoutingModule,
  ],
  declarations: [LogInComponent, RegistrationComponent, BetsAndDepositComponent,DepositCopmponent,ConfirmDirective],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LfWIqAUAAAAALDQckG9em7ENFV3m7G7jWg1ZBCL' } as RecaptchaSettings,
    },
  ],
  exports: [LogInComponent,RegistrationComponent,BetsAndDepositComponent],
})
export class UserModule { }
