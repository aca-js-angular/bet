import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  constructor(private avtorizating : AngularFireAuth) { }

  doLogin(mail, password):Observable<any>{
    this.avtorizating.auth.setPersistence('session');
    return from(this.avtorizating.auth.signInWithEmailAndPassword(mail, password))
  }
 

  resetPassword(mail){
    return from(this.avtorizating.auth.sendPasswordResetEmail(mail))
  }
}
