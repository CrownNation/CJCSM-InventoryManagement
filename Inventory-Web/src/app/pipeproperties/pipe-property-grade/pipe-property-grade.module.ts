import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatInputModule } from '@angular/material/input';

import { PipePropertyGradeComponent } from './pipe-property-grade.component';
import { PipePropertyGradeRoutingModule } from './pipe-property-grade-routing.module';
import { pipeProperty_GradeReducers } from 'src/app/store/pipe-properties/pipe-property-grade/pipe-property-grade.reducers';
import { PipeProperty_GradeEffects } from 'src/app/store/pipe-properties/pipe-property-grade/pipe-property-grade.effects';

@NgModule({
  declarations: [
    PipePropertyGradeComponent,
  ],
  imports: [
    CommonModule,
    PipePropertyGradeRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    StoreModule.forFeature('pipeProperty_Grade', pipeProperty_GradeReducers),
    EffectsModule.forFeature([PipeProperty_GradeEffects]),
  ]
})
export class PipePropertyGradeModule { }
