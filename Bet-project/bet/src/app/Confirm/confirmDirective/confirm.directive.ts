import { Directive, Input } from '@angular/core';
import { PopupService } from 'src/app/user/services/popup.service';

@Directive({
  selector: '[appConfirm]'
})
export class ConfirmDirective {

  @Input('appConfirm') details: [string, any];

  constructor(private popup: PopupService) { 
    this.popup.message = this.details[0];
    this.popup.ok = this.details[1];
  }

}
