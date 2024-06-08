import { Component, Input, OnInit, ViewChild, SimpleChanges, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Pipe } from 'src/app/models/pipe.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-pipe-detail',
  templateUrl: './pipe-detail-view.component.html',
  styleUrls: ['./pipe-detail-view.component.scss']
})
export class PipeDetailViewComponent implements OnInit, AfterViewInit {
  @Input() pipes: Pipe[] = [];

  columnsToDisplay: string[] = ['quantity', 'lengthFeet', 'lengthMeters', 'tier'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  dataSource: MatTableDataSource<Pipe> = new MatTableDataSource<Pipe>();

  expandedRows = new Map<string, boolean>();  // Use unique identifiers if available, such as row ID

  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource.data = this.pipes;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pipes']) {
      this.updateDataSource();
    }
  }

  private updateDataSource(): void {
    this.dataSource.data = this.pipes;
    this.pipes.forEach(pipe => this.expandedRows.set(pipe.pipeId, false));  // Reset expansion state on data change
  }

  toggleRow(row: Pipe): void {
    this.expandedRows.set(row.pipeId, !this.expandedRows.get(row.pipeId));  // Toggle expansion state
  }

  isRowExpanded(row: Pipe): boolean {
    return !!this.expandedRows.get(row.pipeId);  // Returns true if row is expanded
  }
}
