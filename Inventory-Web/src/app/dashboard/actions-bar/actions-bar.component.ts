import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TallyAddComponent } from '../../tally/tally-add/tally-add.component';

@Component({
  selector: 'app-actions-bar',
  templateUrl: './actions-bar.component.html',
  styleUrls: ['./actions-bar.component.scss']
})
export class ActionsBarComponent {


  constructor(public dialog: MatDialog) { }


  openAddTallyDialog(): void {
    const dialogRef = this.dialog.open(TallyAddComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can do something with the result here if needed
    });
  }


}
