import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MeasurementUnit, Pipe } from '../../models/pipe.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';

@Component({
  selector: 'app-pipe-search',
  templateUrl: './pipe-search.component.html',
  styleUrls: ['./pipe-search.component.scss']
})
export class PipeSearchComponent {

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

  constructor(
    private router: Router,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    console.log('pipe search onInit');
    console.log(this.pipes);
    this.dataSource = new MatTableDataSource(this.pipes);
  }

  editTier(pipe: Pipe) {
    console.log(pipe);
  }

  addTier() {

    console.log('add pipe');
    // this.dialog.open(AddTierComponent, {
    //   width: '500px',
    //   data: { 
    //     rackId: this.tiers[0].rackId
    //   }
    // });      

  }


}
