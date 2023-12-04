import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopLocation } from '../../models/shop.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerCreate } from '../../models/customer.model';
import { actionCreateCustomer } from '../../store/customer/customer.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent {

  customerAddForm!: FormGroup;

  // Todo: Handle errors on this and closing form with the closing on success

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<CustomerAddComponent>)  {
  }

  ngOnInit(): void {
    this.buildForm();

  }

  buildForm() {
    this.customerAddForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      address1: new FormControl(null, ),
      address2: new FormControl(null),
      city: new FormControl(null),
      provinceState: new FormControl(null),
      postalCode: new FormControl(null),
      email: new FormControl(null, [Validators.email]),
    });
  }

  addCustomer() {
    console.log('add customer');

    if(this.customerAddForm.valid) {

      const customerCreate: CustomerCreate = {
        name: this.customerAddForm.value.name,
        address1: this.customerAddForm.value.address1,
        address2: this.customerAddForm.value.address2,
        city: this.customerAddForm.value.city,
        provinceState: this.customerAddForm.value.provinceState,
        postalCode: this.customerAddForm.value.postalCode,
        email: this.customerAddForm.value.email,
      }
      console.log(customerCreate);

      this.store.dispatch(actionCreateCustomer({ customerCreate }));
      this.dialogRef.close();

    }
    else {
      this.customerAddForm.markAllAsTouched();
    }



  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}

