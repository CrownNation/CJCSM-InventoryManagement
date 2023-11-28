import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Customer, CustomerWithPipe } from '../../models/customer.model';
import { Pipe } from '../../models/pipe.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { selectSelectedCustomer } from '../../store/customer/customer.selectors';
import { AppState } from '../../store/core.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CustomerViewComponent implements OnInit, OnDestroy {

  customerForm!: FormGroup
  customer: Customer | null = null;
  columnsToDisplay : string[] = [ 
    'quantity', 
    'lengthFeet', 
    'lengthMeters', 
    'rack'
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Pipe | null;
  dataSource: MatTableDataSource<Pipe> = new MatTableDataSource<Pipe>;

  customer$: Observable<CustomerWithPipe | null> = this.store.select(selectSelectedCustomer);
  loading: Boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {  }

  ngOnInit(): void {

    this.customer$.pipe(takeUntil(this.destroy$)).subscribe((customer) => {
      if (customer) {       
        
        console.log(customer);

        this.loading = false;
        this.customer = customer.customer;
        this.dataSource = new MatTableDataSource(customer.pipeList as Pipe[]);
      } 
    });    

    // this.buildForm();
  }


  // buildForm() {

  //   this.customerForm = new FormGroup({
  //     tallyType: new FormControl('', []),      
  //     tallyNumber: new FormControl('', []),
  //     customer: new FormControl('', []),
  //     dateStart: new FormControl('', []),
  //     dateEnd: new FormControl('', [])           
  //   });
  // }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}