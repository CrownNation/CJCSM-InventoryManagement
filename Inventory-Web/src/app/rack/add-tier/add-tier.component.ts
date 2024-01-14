import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MeasurementUnit, PipeDefinition } from '../../models/pipe.model';

@Component({
  selector: 'app-add-tier',
  templateUrl: './add-tier.component.html',
  styleUrls: ['./add-tier.component.scss']
})
export class AddTierComponent implements OnInit{

  addTierForm!: FormGroup;

  pipes: PipeDefinition[] = [
    // {
    //   pipeDefinitionId: '123',
    //   pipeSize: {
    //     pipeSizeId: 'M',
    //     measurementUnit: MeasurementUnit.metric
    //   },
    //   pipeCondition: {
    //     pipeConditionId: 'U',
    //     pipeCondition: 'Used'
    //   },
    //   pipeThread: {
    //     pipeThreadId: 'NPT',
    //     pipeThread: 'National Pipe Thread'
    //   },
    //   pipeGrade: {
    //     pipeGradeId: 'API5LX52',
    //     pipeGrade: 'API 5L X52'
    //   },
    //   pipeCoating: {
    //     pipeCoatingId: 'ExternalFBE',
    //     pipeCoating: 'External Fusion Bonded Epoxy'
    //   },
    //   weight: 100,
    //   wallSize: 0.5
    // },
    // {
    //   pipeDefinitionId: '456',
    //   pipeSize: {
    //     pipeSizeId: 'L',
    //     measurementUnit: MeasurementUnit.metric
    //   },
    //   pipeCondition: {
    //     pipeConditionId: 'N',
    //     pipeCondition: 'New'
    //   },
    //   pipeThread: {
    //     pipeThreadId: 'thread2',
    //     pipeThread: 'International Pipe Thread'
    //   },
    //   pipeGrade: {
    //     pipeGradeId: 'gradeId2',
    //     pipeGrade: 'Pretty good'
    //   },
    //   pipeCoating: {
    //     pipeCoatingId: 'YBandId',
    //     pipeCoating: 'Y Band'
    //   },
    //   weight: 30,
    //   wallSize: 0.15
    // }
  ];

  constructor(public dialogRef: MatDialogRef<AddTierComponent>) { }

  ngOnInit(): void {    
    this.buildForm();
  }

  buildForm() {
    this.addTierForm = new FormGroup({
      tierNumber: new FormControl('', [Validators.required]),
      pipeType: new FormControl('', [Validators.required]),
      numberOfPipe: new FormControl(0, [Validators.required]),
    });
  }

}
