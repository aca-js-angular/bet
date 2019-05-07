/*
  Modules
  **/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './user/popup/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgImageSliderModule } from 'ng-image-slider';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { GamesModule } from './games/games.module';
import { environment } from '../environments/environment';

/*
  Components
  **/

import { AppComponent } from './app.component';
import { DialogContentExample } from './user/popup/dialog-content-example';
import { Slider } from './user/slider.component';
import { ConfirmComponent } from './user/Confirm/confirm.component';
import { Page404Component } from './page404/page404.component';
// import { ConfirmComponent } from './user/Confirm/confirm.component';
/*
  Directives
  **/
// import { ConfirmDirective } from './Confirm/ConfirmDirective/confirm.directive';


@NgModule({
  declarations: [
    AppComponent,DialogContentExample,Slider,ConfirmComponent, Page404Component
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    MaterialModule,
    NgImageSliderModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AppRoutingModule, 
    MatNativeDateModule,
    ReactiveFormsModule,
    UserModule,
    GamesModule,
  ],
  entryComponents: [DialogContentExample,ConfirmComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
