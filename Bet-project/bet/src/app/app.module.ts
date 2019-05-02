import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './user/popup/material.module';
import { DialogContentExample } from './user/popup/dialog-content-example';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgImageSliderModule } from 'ng-image-slider';
import { Slider } from './user/slider.component';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { GamesModule } from './games/games.module';
import { ConfirmComponent } from './Confirm/confirm.component';
import { PopupService } from './user/services/popup.service';

@NgModule({
  declarations: [
    AppComponent,DialogContentExample,Slider, ConfirmComponent
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
  providers: [PopupService],
  bootstrap: [AppComponent],
})
export class AppModule { }
