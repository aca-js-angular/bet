import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {NgModule} from '@angular/core';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatDialogModule,
} from '@angular/material';
import { LogInComponent } from '../components/log-in/log-in.component';
import { RegistrationComponent } from '../components/registration/registration.component';
import { DepositCopmponent } from '../components/bets-and-deposit/deposit.component';
  
@NgModule({
  exports: [
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  entryComponents: [LogInComponent, RegistrationComponent,DepositCopmponent],
})
export class MaterialModule {}