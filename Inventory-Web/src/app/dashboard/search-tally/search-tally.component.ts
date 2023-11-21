import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Tally, TallyTypes } from '../../models/tally.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AppState } from '../../store/core.state';
import { Store } from '@ngrx/store';
import { Rack } from '../../models/rack.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-search-tally',
  templateUrl: './search-tally.component.html',
  styleUrls: ['./search-tally.component.scss']
})
export class SearchTallyComponent implements OnInit, AfterViewInit {
  
  @Input() racks!: Rack[] | null;

  displayedColumns: string[] = ['name', 'shopName', 'actions'];
  dataSource: MatTableDataSource<Rack> = new MatTableDataSource<Rack>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tallyForm!: FormGroup
  tallyTypes = Object.values(TallyTypes);

  customers: Customer[] = [];


  constructor(
    private router: Router,
    private store: Store<AppState>)
  {  }

  ngOnInit(): void {
    console.log('rack-list onInit');
    console.log(this.racks);

    this.buildForm();
    this.dataSource = new MatTableDataSource(this.racks as Rack[]);
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

  addRack() {
    console.log('add rack');
    this.router.navigate(['/rack/add']);    
  }

  filter()  {
    console.log('filter');
  }

  clearForm() {
    this.tallyForm.reset();
  }


  // viewRack(rack: Rack) {
  //   console.log(rack);
  //   this.router.navigate([`/rack/${rack.rackId}`]);    
  // }


}
