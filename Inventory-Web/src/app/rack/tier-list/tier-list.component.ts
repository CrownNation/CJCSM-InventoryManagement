import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Tier } from '../../models/tier.model';
import { MeasurementUnit } from '../../models/pipe.model';

@Component({
  selector: 'app-tier-list',
  templateUrl: './tier-list.component.html',
  styleUrls: ['./tier-list.component.scss']
})
export class TierListComponent implements OnInit {


  displayedColumns: string[] = ['number', 'length', 'quantity', 'actions'];
  dataSource: MatTableDataSource<Tier> = new MatTableDataSource<Tier>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tiers: Tier[] = [
    { 
      tierId: '1', 
      rackId: 'rack1', 
      number: 1,
      pipe: [
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
          quantity: 14
        }]
    }
  ];


  constructor(
    private router: Router,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    console.log('rack-list onInit');
    console.log(this.tiers);
    this.dataSource = new MatTableDataSource(this.tiers);
  }

  editTier(tier: Tier) {
    console.log(tier);
  }

  addTier() {
  }


}
