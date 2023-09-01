import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MeasurementUnit, Pipe, PipeSize } from '../../models/pipe.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopLocation } from '../../models/shop.model';
import { Rack } from '../../models/rack.model';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-pipe-search',
  templateUrl: './pipe-search.component.html',
  styleUrls: ['./pipe-search.component.scss']
})
export class PipeSearchComponent {

  filterPipeForm!: FormGroup
  //  = new FormGroup({
  //   pipeSize: new FormControl('', []),
  //   pipeCondition: new FormControl('', []),
  //   pipeThread: new FormControl('', []),
  //   pipeGrade: new FormControl('', []),
  //   pipeCoating: new FormControl('', []),
  //   weight: new FormControl('', []),      
  //   wallSize: new FormControl('', []),
  //   length: new FormControl('', []),
  //   rack: new FormControl('', []),
  //   customer: new FormControl('', []),
  //   shop: new FormControl('', [])
  // });

  displayedColumns: string[] = ['pipeCoating', 'length', 'quantity', 'rack', 'shop'];
  dataSource: MatTableDataSource<Pipe> = new MatTableDataSource<Pipe>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pipes: Pipe[] = [
    { 
      pipeId: 'pipe1',
      pipeDefintion: {
        pipeDefinitionId: '123',
        pipeSize: {
          pipeSizeId: 'M',
          measurementUnit: MeasurementUnit.metric
        },
        pipeCondition: {
          pipeConditionId: 'U',
          pipeCondition: 'Used'
        },
        pipeThread: {
          pipeThreadId: 'NPT',
          pipeThread: 'National Pipe Thread'
        },
        pipeGrade: {
          pipeGradeId: 'API5LX52',
          pipeGrade: 'API 5L X52'
        },
        pipeCoating: {
          pipeCoatingId: 'ExternalFBE',
          pipeCoating: 'External Fusion Bonded Epoxy'
        },
        weight: 100,
        wallSize: 0.5
      },
      length: 100,
      quantity: 14,
      rack: {
        rackId: 'rack1',
        name: 'Rack 1',
        shopLocationId: 'shop1',
        shopName: 'Shop 1'
      }
    }
  ];

  // Todo: get this from the store
  shops: ShopLocation[] = [
    {
      shopLocationId: '1',
      shopLocationName: 'Shop 1'
    },
    {
      shopLocationId: '2',
      shopLocationName: 'Shop 2'
    },
    {
      shopLocationId: '3',
      shopLocationName: 'Shop 3'
    },
  ];

  pipeSizes: PipeSize[] = [
    {
      pipeSizeId: 'M',
      measurementUnit: MeasurementUnit.metric
    },
    {
      pipeSizeId: 'I',
      measurementUnit: MeasurementUnit.imperial
    }
  ];

  pipeConditions = [
    {
      pipeConditionId: 'U',
      pipeCondition: 'Used'
    },
    {
      pipeConditionId: 'N',
      pipeCondition: 'New'
    }
  ];

  pipeThreads = [
    {
      pipeThreadId: 'NPT',
      pipeThread: 'National Pipe Thread'
    },
    {
      pipeThreadId: 'BTC',
      pipeThread: 'Buttress Thread Casing'
    }
  ];

  pipeGrades = [
    {
      pipeGradeId: 'API5LX52',
      pipeGrade: 'API 5L X52'
    },
    {
      pipeGradeId: 'API5LX60',
      pipeGrade: 'API 5L X60'
    }
  ];

  pipeCoatings = [
    {
      pipeCoatingId: 'ExternalFBE',
      pipeCoating: 'External Fusion Bonded Epoxy'
    },
    {
      pipeCoatingId: 'External3LPE',
      pipeCoating: 'External 3 Layer Polyethylene'
    }
  ];

  racks: Rack[] = [];
  customers: Customer[] = [];

  constructor(
    private router: Router,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    console.log('pipe search onInit');
    console.log(this.pipes);
    this.dataSource = new MatTableDataSource(this.pipes);   
    
    this.buildForm();
  }

  buildForm() {
    this.filterPipeForm = new FormGroup({
      pipeSize: new FormControl('', []),
      pipeCondition: new FormControl('', []),
      pipeThread: new FormControl('', []),
      pipeGrade: new FormControl('', []),
      pipeCoating: new FormControl('', []),
      weight: new FormControl('', []),      
      wallSize: new FormControl('', []),
      length: new FormControl('', []),
      rack: new FormControl('', []),
      customer: new FormControl('', []),
      shopLocation: new FormControl('', [])
    });
  }

  filter()  {
    console.log('filter');
  }

  clearForm() {
    this.filterPipeForm.reset();
  }

  editTier(pipe: Pipe) {
    console.log(pipe);
  }





}
