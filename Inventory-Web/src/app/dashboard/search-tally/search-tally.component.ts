import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Tally, TallySearchParams, TallyTypes } from '../../models/tally.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AppState } from '../../store/core.state';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { Customer } from '../../models/customer.model';
import { actionGetTallies, actionGetTallyById } from '../../store/tally/tally.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectLoadingTallies, selectTallies, selectTalliesEntities } from '../../store/tally/tally.selectors';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'app-search-tally',
  templateUrl: './search-tally.component.html',
  styleUrls: ['./search-tally.component.scss']
})
export class SearchTallyComponent implements OnInit, AfterViewInit, OnDestroy {
  
  displayedColumns: string[] = [ 
    'tallyNumber', 
    'customerName', 
    'shopName', 
    'tallyType', 
    'date',
    'actions'
  ];
  dataSource: MatTableDataSource<Tally> = new MatTableDataSource<Tally>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tallyForm!: FormGroup
  tallyTypes = Object.values(TallyTypes).filter(value => typeof value === 'number') as number[];

  customers: Customer[] = [];
  searchParams: TallySearchParams | null = {
    tallyType: null,
    tallyNumber: null,
    customerId: null,
    dateStart: null,
    dateEnd: null
  };

  private destroy$ = new Subject<void>();

  tallies$: Observable<Tally[]> = this.store.select(selectTallies);
  loadingTallies: Boolean = false;
  loading$: Observable<Boolean> = this.store.select((selectLoadingTallies));
 
  constructor(
    private router: Router,
    private store: Store<AppState>)
  {  }


  ngOnInit(): void {

    this.buildForm();
    this.loadingTallies = true;   
    this.setDefaultDateCriteria();
    this.store.dispatch(actionGetTallies({searchParams: this.searchParams}));
   

    this.tallies$.pipe(takeUntil(this.destroy$)).subscribe((tallies) => {
      if (tallies) {       
        this.dataSource = new MatTableDataSource(tallies as Tally[]);
        this.loadingTallies = false;
        
        if(tallies.length > 0)
          this.store.dispatch(actionGetTallyById({tallyId: tallies[0].tallyId}));

      } 
    });

    this.loading$.subscribe((loading) => {
      this.loadingTallies = loading; 
    });

  }

  buildForm() {

    this.tallyForm = new FormGroup({
      tallyType: new FormControl('', []),      
      tallyNumber: new FormControl('', []),
      customer: new FormControl('', []),
      dateStart: new FormControl('', []),
      dateEnd: new FormControl('', [])           
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

  setDefaultDateCriteria() {
    if (this.searchParams) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // getMonth() returns a 0-based month
      const day = date.getDate();

      const formattedDateEnd = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      this.searchParams.dateEnd = formattedDateEnd;
      this.tallyForm.controls['dateEnd'].setValue(formattedDateEnd);

      const dateStart = new Date();
      dateStart.setMonth(date.getMonth() - 1);
      
      const yearStart = dateStart.getFullYear();
      const monthStart = dateStart.getMonth() + 1; // getMonth() returns a 0-based month
      const dayStart = dateStart.getDate();

      const formattedDateStart = `${yearStart}-${monthStart.toString().padStart(2, '0')}-${dayStart.toString().padStart(2, '0')}`;
      this.searchParams.dateStart = formattedDateStart;
      this.tallyForm.controls['dateStart'].setValue(formattedDateStart);
    } 
  }

  addRack() {
    console.log('add rack');
    this.router.navigate(['/rack/add']);    
  }

  filter()  {
    this.searchParams = {
      tallyType: this.tallyForm.value.tallyType,
      tallyNumber: this.tallyForm.value.tallyNumber,
      customerId: this.tallyForm.value.customer,
      dateStart: this.tallyForm.value.dateStart,
      dateEnd: this.tallyForm.value.dateEnd
    };
    this.loadingTallies = true;
    this.store.dispatch(actionGetTallies({searchParams: this.searchParams}));
  }

  clearForm() {
    this.tallyForm.reset();
    this.searchParams = {
      tallyType: null,
      tallyNumber: null,
      customerId: null,
      dateStart: null,
      dateEnd: null
    };
    this.setDefaultDateCriteria();
    this.store.dispatch(actionGetTallies({searchParams: this.searchParams}));
  }

  // Todo: move to a helper function
  displayTallyType(tallyType: number) {
    if(tallyType === TallyTypes.TallyIn) {
      return 'In'
    }
    else if(tallyType === TallyTypes.TallyOut) {
      return 'Out'
    }
    
    return ''    
  }

  viewTally(tally: Tally) {
    // this.router.navigate([`/rack/${rack.rackId}`]);    
    this.store.dispatch(actionGetTallyById({tallyId: tally.tallyId}));
  }

  ngOnDestroy() {
    console.log('');
    this.destroy$.next();
    this.destroy$.complete();
  }


}
