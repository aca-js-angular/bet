import { Component } from '@angular/core';
import { AuthentificationService } from './user/services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private auth:AuthentificationService){
    this.auth.checkAuthState();
    
   }
   logOut(){
     this.auth.logOut();
   }
}
