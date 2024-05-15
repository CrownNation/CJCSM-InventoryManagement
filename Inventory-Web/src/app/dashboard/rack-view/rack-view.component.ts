import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RackWithPipe } from '../../models/rack.model';
import { selectSelectedRack } from '../../store/rack/rack.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/core.state';
import { Pipe } from '../../models/pipe.model';

@Component({
  selector: 'app-rack-view',
  templateUrl: './rack-view.component.html',
  styleUrls: ['./rack-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RackViewComponent implements OnInit, OnDestroy {

  customerForm!: FormGroup
  rack: RackWithPipe | null = null;
  columnsToDisplay: string[] = [
    'quantity',
    // 'lengthFeet',
    'lengthMeters',
    'rack',
    'tier'
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Pipe | null;
  dataSource: MatTableDataSource<Pipe> = new MatTableDataSource<Pipe>;

  rack$: Observable<RackWithPipe | null> = this.store.select(selectSelectedRack);
  loading: Boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.rack$.pipe(takeUntil(this.destroy$)).subscribe((rack) => {
      if (rack && rack.pipeList && rack.pipeList.length > 0) {
        this.loading = false;
        this.rack = rack;

        // Sorting the pipe list by TierNumber
        const sortedPipes = [...rack.pipeList].sort((a, b) => a.tierNumber - b.tierNumber);
        this.dataSource = new MatTableDataSource(sortedPipes);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}