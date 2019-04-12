import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';



@Component({
  selector: 'dialog-content-example',
  templateUrl: 'dialog-content-example.html',
  styleUrls:['dialog-content-example.scss'],
})
export class DialogContentExample {
  constructor(public dialog: MatDialog,){}

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(DialogContentExampleDialog,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})

export class DialogContentExampleDialog {  }

