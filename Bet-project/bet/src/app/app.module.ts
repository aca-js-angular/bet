/*
  Modules
  **/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './user/components/popup/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { GamesModule } from './games/games.module';
import { environment } from '../environments/environment';
import { NgXCreditCardsModule } from 'ngx-credit-cards';

/*
  Components
  **/

import { AppComponent } from './app.component';
import { DialogContentExample } from './user/components/popup/dialog-content-example';
// import { Slider } from './user/slider.component';
import { ConfirmComponent } from './user/Confirm/confirm.component';
import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [
    AppComponent,DialogContentExample,ConfirmComponent, Page404Component
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    NgXCreditCardsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    UserModule,
    GamesModule,
    AppRoutingModule, 
  ],
  entryComponents: [DialogContentExample,ConfirmComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
