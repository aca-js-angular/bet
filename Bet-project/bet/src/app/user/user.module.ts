import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [LogInComponent, RegistrationComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
