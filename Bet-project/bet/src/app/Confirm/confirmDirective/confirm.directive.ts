import { Directive, Input } from '@angular/core';
import { ConfirmService } from '../confirm.service';

@Directive({
  selector: '[appConfirm]'
})
export class ConfirmDirective {

  @Input() details: [string, Function];

  constructor(private confirm: ConfirmService) { 
    this.confirm.message = this.details[0];
    this.confirm.confirmFunction = this.details[1];
  }

}
