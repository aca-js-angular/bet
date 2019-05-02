import { Component, OnInit, Inject, } from '@angular/core';
import { PopupService } from '../user/services/popup.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  message:string
  ok:Function;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data)
   }
  
  ngOnInit() {
  }

}
