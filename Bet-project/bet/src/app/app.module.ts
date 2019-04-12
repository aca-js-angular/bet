import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './user/material.module';
import { DialogContentExample, DialogContentExampleDialog } from './user/dialog-content-example';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgImageSliderModule } from 'ng-image-slider';
import { Slider } from './user/slider.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,DialogContentExample, DialogContentExampleDialog,Slider
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,
    MaterialModule,
    NgImageSliderModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AppRoutingModule, 
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  entryComponents: [DialogContentExample, DialogContentExampleDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
