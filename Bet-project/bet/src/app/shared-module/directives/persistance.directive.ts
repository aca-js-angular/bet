import { Directive, Input, HostListener, ViewContainerRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PopupService } from 'src/app/user/services/popup.service';

@Directive({
  selector: '[_persistance]'
})
export class PersistanceDirective {

  @Input('_persistance') callback: Function;

  constructor(
    private fireAuth: AngularFireAuth,
    private dialog: PopupService,
    private viewRef: ViewContainerRef
  ) {}

  @HostListener('click')onClick(){

    const currentUser = this.fireAuth.auth.currentUser

    if(currentUser){
      const hostComponent = this.viewRef['_view'].component
      this.callback.call(hostComponent,currentUser)
    }else{
      this.dialog._openSignIn()
    }
    
  }

}
