import { Directive, Input, HostListener, ViewContainerRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import { PopupService } from 'src/app/user/services/popup.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { LogInComponent } from 'src/app/user/components/log-in/log-in.component';

@Directive({
  selector: '[_persistance]'
})
export class PersistanceDirective {

  @Input('_persistance') callback: Function;

  constructor(
    private fireAuth: AngularFireAuth,
    private dialog: MatDialog,
    private viewRef: ViewContainerRef
  ) {}

  @HostListener('click')onClick(){

    const currentUser = this.fireAuth.auth.currentUser

    if(currentUser){
      const hostComponent = this.viewRef['_view'].component
      this.callback.call(hostComponent,currentUser)
    }else{
        const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      this.dialog.open(LogInComponent,dialogConfig);
      }
    } 
  }
