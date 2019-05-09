import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  
  private user: Observable<firebase.User>;
  isLogged: boolean;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.checkAuthState();
  }

  checkAuthState() {
    this._firebaseAuth.auth.onAuthStateChanged(
      res => {
        if(res) this.isLogged = true;
        else this.isLogged = false;
      }
    )
  }

  logOut(){
    this._firebaseAuth.auth.signOut();
  }
}
