import { AfterViewInit, Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RackBasic } from '../../models/rack.model';
import { selectAllRackEntities, selectErrorLoadingRacks, selectLoadingRacks, selectRacks, selectRacks2 } from '../../store/rack/rack.selectors';
import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from '../../store/core.state';
import { Dictionary } from '@ngrx/entity';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rack-list',
  templateUrl: './rack-list.component.html',
  styleUrls: ['./rack-list.component.scss']
})

export class RackListComponent implements OnInit, AfterViewInit{

  // private readonly store: Store<AppState> = inject(Store<AppState>)

  // readonly messages$: Observable<Rack[]> = this.store.select(selectRacks2);
  @Input() racks!: RackBasic[] | null;
  
  displayedColumns: string[] = ['name', 'shopName', 'actions'];
  dataSource: MatTableDataSource<RackBasic> = new MatTableDataSource<RackBasic>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  // racks$: Observable<Dictionary<any>> = this.store.pipe(select(selectRacks));
  // loadingRack$: Observable<Boolean> = this.store.pipe(select(selectLoadingRacks));
  // errorRacks$: Observable<HttpErrorResponse | null> = this.store.pipe(select(selectErrorLoadingRacks));

  constructor(
    private router: Router,
    private store: Store<AppState>) {
    // this.dataSource = new MatTableDataSource(this.racks as Rack[]);
  }

  ngOnInit(): void {
    console.log('rack-list onInit');
    console.log(this.racks);
    this.dataSource = new MatTableDataSource(this.racks as RackBasic[]);
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

  addRack() {
    console.log('add rack');
    this.router.navigate(['/rack/add']);
  }


  viewRack(rack: RackBasic) {
    console.log(rack);
    this.router.navigate([`/rack/${rack.rackId}`]);
  }

}
