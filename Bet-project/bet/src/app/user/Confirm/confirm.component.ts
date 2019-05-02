import { Component, OnInit, Inject, } from '@angular/core';
import { PopupService } from '../services/popup.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  message:string
  ok:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = this.data.message;
    this.ok = this.data.ok;
   }
  
  ngOnInit() {
  }

}
