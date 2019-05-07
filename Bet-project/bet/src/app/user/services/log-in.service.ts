import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { RegistrationComponent } from '../components/registration/registration.component';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private avtorizating: AngularFireAuth,private dialog:MatDialog) { }

  doLogin(mail, password, remeberPassw): Observable<any> {
    if (!remeberPassw){
      this.avtorizating.auth.setPersistence('session');
    } 
    return from(this.avtorizating.auth.signInWithEmailAndPassword(mail, password))
  }


  resetPassword(mail) {
    return from(this.avtorizating.auth.sendPasswordResetEmail(mail))
  }
  _openRegistration() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    this.dialog.open(RegistrationComponent,dialogConfig);
  }
}
