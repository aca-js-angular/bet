import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  currentUser: object = {};

  constructor(private fireAuth: AngularFireAuth) {
   
  }
}
