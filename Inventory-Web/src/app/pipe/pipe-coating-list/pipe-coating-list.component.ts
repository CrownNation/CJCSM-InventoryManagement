import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PipeCoating } from '../../models/pipe.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';

@Component({
  selector: 'app-pipe-coating-list',
  templateUrl: './pipe-coating-list.component.html',
  styleUrls: ['./pipe-coating-list.component.scss']
})
export class PipeCoatingListComponent implements OnInit {

  displayedColumns: string[] = ['pipeCoating', 'actions'];
  dataSource: MatTableDataSource<PipeCoating> = new MatTableDataSource<PipeCoating>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pipeCoatings: PipeCoating[] = [
    { pipeCoatingId: 'ExternalFBE', pipeCoating: 'External Fusion Bonded Epoxy' },
    { pipeCoatingId: 'InternalFBE', pipeCoating: 'Internal Fusion Bonded Epoxy' },
    { pipeCoatingId: 'External3LPE', pipeCoating: 'External 3 Layer Polyethylene' },
    { pipeCoatingId: 'Internal3LPE', pipeCoating: 'Internal 3 Layer Polyethylene' },
    { pipeCoatingId: 'External3LPP', pipeCoating: 'External 3 Layer Polypropylene' }
  ];

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    console.log('pipe coating list init');
    
    this.dataSource = new MatTableDataSource(this.pipeCoatings);
  }

  addPipeCoating() {
    console.log('add coating');
  }

  editCoating(coating: PipeCoating) {
    console.log('edit coating');
  }

}
