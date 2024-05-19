import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Rack, RackSearchParams } from '../../../models/rack.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ShopLocation } from '../../../models/shop.model';
import { selectLoadingRacks, selectRacks, selectRacksFullList } from '../../../store/rack/rack.selectors';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/core.state';
import { actionGetRackById, actionGetRacks } from '../../../store/rack/rack.actions';

@Component({
  selector: 'app-search-rack',
  templateUrl: './search-rack.component.html',
  styleUrls: ['./search-rack.component.scss']
})
export class SearchRackComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = [
    'name',
    'rackType',
    'shopName',
    'actions'
  ];
  dataSource: MatTableDataSource<Rack> = new MatTableDataSource<Rack>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  rackForm!: FormGroup

  racksFullList: Rack[] = [];
  shopsFullList: ShopLocation[] = [];
  searchParams: RackSearchParams | null = {
    name: null,
    shopId: null,
    rackType: null
  };

  private destroy$ = new Subject<void>();

  racks$: Observable<Rack[]> = this.store.select(selectRacks);
  loadingRacks: Boolean = false;
  loading$: Observable<Boolean> = this.store.select((selectLoadingRacks));

  racksFullList$: Observable<Rack[] | null> = this.store.select(selectRacksFullList);

  constructor(
    private router: Router,
    private store: Store<AppState>)
  {  }


  ngOnInit(): void {

    this.buildForm();
    this.loadingRacks = true;
    this.setDefaultDateCriteria();
    this.store.dispatch(actionGetRacks({searchParams: this.searchParams}));


    this.racks$.pipe(takeUntil(this.destroy$)).subscribe((racks) => {
      if (racks) {
        this.dataSource = new MatTableDataSource(racks as Rack[]);
        this.loadingRacks = false;

        if(racks.length > 0)
          this.store.dispatch(actionGetRackById({rackId: racks[0].rackId}));
      }
    });

    this.racksFullList$.pipe(takeUntil(this.destroy$)).subscribe((racks) => {
      if (racks) {
        this.racksFullList = racks;
      }
    });


    this.loading$.subscribe((loading) => {
      this.loadingRacks = loading;
    });

  }

  buildForm() {

    this.rackForm = new FormGroup({
      rack: new FormControl('', []),
      shop: new FormControl('', [])
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
      // Todo: may need to set a default shop location based on the user's shop location
    }
  }



  // addRack() {
  //   console.log('add rack');
  //   this.router.navigate(['/rack/add']);
  // }

  filter()  {
    this.searchParams = {
      name: this.rackForm.value.rack,
      shopId: this.rackForm.value.shop,
      rackType: this.rackForm.value.rackType
    };
    this.loadingRacks = true;
    this.store.dispatch(actionGetRacks({searchParams: this.searchParams}));
  }

  clearForm() {
    this.rackForm.reset();
    this.searchParams = {
      name: null,
      shopId: null,
      rackType: null
    };
    this.setDefaultDateCriteria();
    this.store.dispatch(actionGetRacks({searchParams: this.searchParams}));
  }

  viewRack(rack: Rack) {
    this.store.dispatch(actionGetRackById({rackId: rack.rackId}));
  }

  ngOnDestroy() {
    console.log('');
    this.destroy$.next();
    this.destroy$.complete();
  }


}
