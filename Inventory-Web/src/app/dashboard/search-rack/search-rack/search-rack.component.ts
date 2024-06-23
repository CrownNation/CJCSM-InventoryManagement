import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Rack, RackSearchParams } from '../../../models/rack.model';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, catchError, delay, of, take, takeUntil, tap } from 'rxjs';
import { ShopLocation } from '../../../models/shop-location.model';
import { selectLoadingRacks, selectRacks } from '../../../store/rack/rack.selectors';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/core.state';
import { actionGetRackById, actionGetRacks } from '../../../store/rack/rack.actions';
import { selectAllShopLocations } from 'src/app/store/shop-location/shop-location.selectors';
import { actionGetShopLocations } from 'src/app/store/shop-location/shop-location.actions';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';
import { clearNotifications } from 'src/app/store/notification-hub/notification-hub.actions';

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
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  rackForm!: FormGroup

  racksFullList: Rack[] = [];
  shopsFullList: ShopLocation[] = [];
  searchParams: RackSearchParams | null = null;

  private destroy$ = new Subject<void>();

  racks$: Observable<Rack[]> = this.store.select(selectRacks);
  loadingRacks: Boolean = false;
  loading$: Observable<Boolean> = this.store.select((selectLoadingRacks));

  racksFullList$: Observable<Rack[] | null> = this.store.select(selectRacks);

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService) { }


  ngOnInit(): void {
    this.buildForm();
    this.loadingRacks = true;

    this.store.dispatch(actionGetShopLocations({ searchParams: null }));

    this.store.dispatch(clearNotifications());

    this.store.select(selectAllShopLocations).pipe(
      takeUntil(this.destroy$)
    ).subscribe((shopLocations) => {
      this.shopsFullList = shopLocations;
      this.rackForm.get('shop')!.setValue("all");
    });

    this.setSearchParams();

    this.racks$.pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        console.error('Error fetching racks:', error);
        return of(null); // Return an observable with null to handle the error gracefully
      })
    ).subscribe((racks) => {
      if (racks) {
        this.dataSource = new MatTableDataSource(racks as Rack[]);
        this.loadingRacks = false;
        if (racks.length > 0) {
          this.store.dispatch(actionGetRackById({ rackId: racks[0].rackId }));
          this.applySorting();
        } 
      } else {
        console.log('No racks data received'); // Log when null or undefined is received
      }
    });

    this.store.dispatch(actionGetRacks({ searchParams: this.searchParams }));

    this.loading$.subscribe((loading) => {
      this.loadingRacks = loading;
    });
  }

  buildForm() {
    this.rackForm = new FormGroup({
      rackName: new FormControl(''),
      rackType: new FormControl("all"),
      shop: new FormControl("'all'")
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applySorting(): void {
    if (this.sort && this.dataSource) {
      this.dataSource.sort = this.sort;
      this.sort.active = 'rackType';
      this.sort.direction = 'desc';
      this.sort.sortChange.emit({ active: this.sort.active, direction: this.sort.direction });

      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'rackType': return item.rackType;
          case 'name': return item.name;
          default: return '';
        }
      };
    }
  }

  setSearchParams(): void {
    const formValue = this.rackForm.value;
    let params: any = {};

    if (formValue.rackName != "") {
      params.name = formValue.rackName;
    }

    if (formValue.rackType != "all") {
      params.rackType = formValue.rackType
    }

    if (formValue.shop != "all" && formValue.shop !== '') {
      params.shopId = formValue.shop;
    }

    if (Object.keys(params).length > 0) {
      this.searchParams = params as RackSearchParams;
    } else {
      this.searchParams = null;
    }
  }

  clearShopLocationCache(): void {
    this.localStorageService.removeItem('shopLocations'); // Clear the specific cache
    this.store.dispatch(actionGetShopLocations({ searchParams: null }));
  }


  onFormSubmit(event: Event) {
    event.preventDefault(); // Prevent the form from submitting which causes the page to reload
    this.filter();
  }
  
  filter() {
    this.setSearchParams();
    this.loadingRacks = true;

    this.store.dispatch(actionGetRacks({ searchParams: this.searchParams }));
  }

  clearForm() {
    this.rackForm.reset();
    this.searchParams = null;
    this.store.dispatch(actionGetRacks({ searchParams: this.searchParams }));
  }

  viewRack(rack: Rack) {
    this.store.dispatch(actionGetRackById({ rackId: rack.rackId }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

  }

}
