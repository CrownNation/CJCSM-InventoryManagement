import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Equipment } from '../../../models/equipment.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail-view.component.html',
  styleUrls: ['./equipment-detail-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class EquipmentDetailViewComponent implements OnInit {
  @Input() equipment: Equipment[] = [];

  columnsToDisplay: string[] = ['quantity', 'lengthFeet', 'lengthMeters'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  dataSource: MatTableDataSource<Equipment> = new MatTableDataSource<Equipment>();

  expandedElement: Equipment | null = null;

  ngOnInit(): void {
    this.dataSource.data = this.equipment;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['equipment']) {
      this.updateDataSource();
    }
  }

  private updateDataSource(): void {
    this.dataSource.data = this.equipment;
  }
}
