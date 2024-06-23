import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer, CustomerSearchParams } from '../../../models/customer.model';
import { actionGetCustomerById, actionGetCustomers } from '../../../store/customer/customer.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectCustomers, selectLoadingCustomers, selectCustomersFullList } from '../../../store/customer/customer.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/core.state';
import { clearNotifications } from 'src/app/store/notification-hub/notification-hub.actions';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.scss']
})
export class SearchCustomerComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = [
    'name',
    'city',
    'provinceState',
    'country',
    'email',
    'actions'
  ];
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource<Customer>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  customerForm!: FormGroup

  customersFullList: Customer[] = [];
  searchParams: CustomerSearchParams | null = {
    customerName: null
  };

  private destroy$ = new Subject<void>();

  customers$: Observable<Customer[]> = this.store.select(selectCustomers);
  loadingCustomers: Boolean = false;
  loading$: Observable<Boolean> = this.store.select((selectLoadingCustomers));

  customersFullList$: Observable<Customer[] | null> = this.store.select(selectCustomersFullList);


  constructor(
    private store: Store<AppState>) { }


  ngOnInit(): void {

    this.buildForm();
    this.loadingCustomers = true;
    this.store.dispatch(actionGetCustomers({ searchParams: this.searchParams }));

    this.store.dispatch(clearNotifications());

    this.customers$.pipe(takeUntil(this.destroy$)).subscribe((customers) => {
      if (customers) {
        this.dataSource = new MatTableDataSource(customers as Customer[]);
        this.loadingCustomers = false;

        if (customers.length > 0)
          this.store.dispatch(actionGetCustomerById({ customerId: customers[0].customerId }));
      }
    });

    this.customersFullList$.pipe(takeUntil(this.destroy$)).subscribe((customers) => {
      if (customers) {
        this.customersFullList = customers;
      }
    });

    this.loading$.subscribe((loading) => {
      this.loadingCustomers = loading;
    });

  }

  buildForm() {

    this.customerForm = new FormGroup({
      customerName: new FormControl('', [])
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filter() {
    this.setSearchParams();
    this.loadingCustomers = true;
    this.store.dispatch(actionGetCustomers({ searchParams: this.searchParams }));
  }


  setSearchParams(): void {
    const formValue = this.customerForm.value;
    let params: any = {};

    if (formValue.customerName != "") {
      params.customerName = formValue.customerName;
    }

    if (Object.keys(params).length > 0) {
      this.searchParams = params as CustomerSearchParams;
    } else {
      this.searchParams = null;
    }
  }

  clearForm() {
    this.customerForm.reset();
    this.searchParams = {
      customerName: null
    };
    this.store.dispatch(actionGetCustomers({ searchParams: this.searchParams }));
  }

  onFormSubmit(event: Event) {
    event.preventDefault(); // Prevent the form from submitting which causes the page to reload
    this.filter();
  }

  viewCustomer(customer: Customer) {
    this.store.dispatch(actionGetCustomerById({ customerId: customer.customerId }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
