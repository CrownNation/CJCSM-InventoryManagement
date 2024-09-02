import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/core.state';
import { Tally } from '../../../models/tally.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectSelectedTally } from '../../../store/tally/tally.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { Pipe } from '../../../models/pipe.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TallyTypes } from 'src/app/enums/tally-types.enum';
import { Equipment } from 'src/app/models/equipment.model';
import { DocumentGeneratorService } from 'src/app/core/services/document-generator-service/document-generator.service';

@Component({
  selector: 'app-tally-view',
  templateUrl: './tally-view.component.html',
  styleUrls: ['./tally-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TallyViewComponent implements OnInit, OnDestroy {

  public TallyTypes = TallyTypes;

  tallyForm!: FormGroup;
  tally: Tally | null = null;
  columnsToDisplay: string[] = [
    'pipeProperties',
    'lengthMeters',
    'quantity',
  ];

  columnsToDisplayEquipment: string[] = ['equipmentProperties', 'quantity'];

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  columnsToDisplayWithExpandEquipment = [...this.columnsToDisplayEquipment, 'expand'];
  
  expandedElement!: Pipe | null;
  dataSourcePipe: MatTableDataSource<Pipe> = new MatTableDataSource<Pipe>();
  dataSourceEquipment: MatTableDataSource<Equipment> = new MatTableDataSource<Equipment>();

  tally$: Observable<Tally | null> = this.store.select(selectSelectedTally);
  loading: Boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>,
    private documentGeneratorService: DocumentGeneratorService
  ) { }

  ngOnInit(): void {
    this.buildForm();

    // Subscribe to tally data
    this.tally$.pipe(takeUntil(this.destroy$)).subscribe((tally) => {
      if (tally) {
        this.loading = false;
        this.tally = tally;
        this.dataSourcePipe = new MatTableDataSource(tally.pipeList as Pipe[]);
        console.log("Tally data received:", tally);
        console.log("CUSTOMER: " + tally.customerName);
        console.log("EQUIPMENT: " + tally.equipmentList.length);
        this.dataSourceEquipment = new MatTableDataSource(tally.equipmentList as Equipment[]);

        // Update the form with the fetched tally details
        this.patchFormWithTallyDetails(tally);
      }
    });
  }

  // Build the form with controls
  buildForm() {
    this.tallyForm = new FormGroup({
      tallyType: new FormControl('', []),
      tallyNumber: new FormControl('', []),
      customer: new FormControl('', []),
      dateStart: new FormControl('', []),
      dateEnd: new FormControl('', [])
    });
  }

  // Patch the form with values from the tally
  patchFormWithTallyDetails(tally: Tally) {
    if (tally === undefined) {
      console.log("TALLY INFO: Tally is null");
    } else {
      console.log("TALLY INFO: " + tally.customerName);
    }
    this.tallyForm.patchValue({
      tallyType: tally.tallyType,
      tallyNumber: tally.tallyNumber,
      customer: tally.customerName,
      dateStart: tally.dateOfCreation
    });
  }

  get tallyTypeOptions(): TallyTypes[] {
    return Object.values(TallyTypes);
  }

  displayTallyType(tallyType: TallyTypes) {
    if (tallyType === TallyTypes.In) {
      return 'In'
    }
    else if (tallyType === TallyTypes.Out) {
      return 'Out'
    }

    return ''
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  generatePdf(tally: Tally) {
    this.documentGeneratorService.generateTallyPdf(tally.tallyId).subscribe(
      (blob: Blob) => {
        const date = new Date(); // Get the current date and time
        const formattedDate = date.toISOString().slice(0, 16).replace(/[-T:]/g, '.'); // Format the date as 'yyyy-MM-dd.HH-mm'
 
        const filename = `TallyReport_${tally.tallyNumber}_${formattedDate}.pdf`; // Construct the filename
  
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename; // Use the constructed filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      (error: any) => {
        console.error('Error generating PDF:', error);
      }
    );
  }
  
}
