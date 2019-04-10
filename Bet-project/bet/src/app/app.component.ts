import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bet';
  loginStateBool: boolean | null = null;

  signIn() {
    this.loginStateBool = true;
  }

  signUp() {
    this.loginStateBool = false;
  }

}
