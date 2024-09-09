import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerAddComponent } from '../customer-add/customer-add.component';
import { RackAddComponent } from '../rack-add/rack-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions-bar',
  templateUrl: './actions-bar.component.html',
  styleUrls: ['./actions-bar.component.scss']
})
export class ActionsBarComponent {


  constructor(
    public dialog: MatDialog,
    private router: Router) { }

  openAddTallyDialog(): void {
    this.router.navigate(['/tally/add']);
  }

  openAddCustomerDialog(): void {
    const dialogRef = this.dialog.open(CustomerAddComponent, {
      data: { customer: null }});

    dialogRef.afterClosed().subscribe(result => {
      // You can do something with the result here if needed
    });
  }

  openAddRackDialog(): void {
    const dialogRef = this.dialog.open(RackAddComponent, {
      data: { rack: null }});

    dialogRef.afterClosed().subscribe(result => {
      // You can do something with the result here if needed
    });
  }


}
