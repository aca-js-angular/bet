import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  message: string;
  confirmFunction: Function;

  constructor() { }
}
