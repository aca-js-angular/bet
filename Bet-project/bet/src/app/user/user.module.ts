import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { LogInComponent } from './components/log-in/log-in.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { UserRoutingModule } from './user-routing.module';
import { RecaptchaDirective } from './directives/recaptcha.directive';
import { MaterialModule } from './popup/material.module';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    UserRoutingModule
  ],
  declarations: [LogInComponent, RegistrationComponent, RecaptchaDirective],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LddwJ0UAAAAADVcYu3ruf8qVmL8uCP3adQ-Xw3h' } as RecaptchaSettings,
    },
  ],
  exports: [LogInComponent,RegistrationComponent],
})
export class UserModule { }
