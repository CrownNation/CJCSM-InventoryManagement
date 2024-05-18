import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopLocation } from '../../models/shop.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer, CustomerCreate } from '../../models/customer.model';
import { actionCreateCustomer } from '../../store/customer/customer.actions';
import { Observable, Subject } from 'rxjs';
import { NotificationService } from '../../core/notifications/notification.service';
import { selectCreatedCustomer, selectCreatingCustomer, selectCreatingCustomerError } from '../../store/customer/customer.selectors';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent {

  customerAddForm!: FormGroup;

  isInit: boolean = true;
  loading: Boolean = true;
  error: HttpErrorResponse | null = null;

  private destroy$ = new Subject<void>();
  creatingCustomer$: Observable<Boolean> = this.store.select((selectCreatingCustomer));
  createdCustomer$: Observable<Customer | null> = this.store.select((selectCreatedCustomer));
  error$: Observable<HttpErrorResponse | null> = this.store.select((selectCreatingCustomerError));

  // Todo: Handle errors on this and closing form with the closing on success

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<CustomerAddComponent>,
    private notificationService: NotificationService)  {
  }

  ngOnInit(): void {
    this.buildForm();

    this.error$.subscribe((error) => {
      if(error) {
        console.error(error);
        this.error = error;
        this.notificationService.success('There was a problem creating the customer. ');
      }
    });

    this.createdCustomer$.subscribe((customer) => {
      console.log('customer: ', customer);

      if(customer && !this.isInit) {
        this.notificationService.success('Customer Created Successfully');
        this.notificationService.error('THIS IS AN ERROR')
        this.dialogRef.close();
      }
    });

    this.creatingCustomer$.subscribe((loading) => {
      this.loading = loading;
    });
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

      this.isInit = false;
      this.store.dispatch(actionCreateCustomer({ customerCreate }));
    }
    else {
      this.customerAddForm.markAllAsTouched();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

