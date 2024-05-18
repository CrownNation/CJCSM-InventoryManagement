import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pipe } from '../../models/pipe.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-pipe-detail',
  templateUrl: './pipe-detail-view.component.html',
  styleUrls: ['./pipe-detail-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PipeDetailViewComponent implements OnInit {
  @Input() pipes: Pipe[] = [];

  columnsToDisplay: string[] = ['quantity', 'lengthFeet', 'lengthMeters', 'tier'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  dataSource: MatTableDataSource<Pipe> = new MatTableDataSource<Pipe>();

  expandedElement: Pipe | null = null;

  ngOnInit(): void {
    this.dataSource.data = this.pipes;
  }

  // Respond to changes in the pipe to display.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pipes']) {
      this.updateDataSource();
    }
  }

  private updateDataSource(): void {
    this.dataSource.data = this.pipes;
  }

}