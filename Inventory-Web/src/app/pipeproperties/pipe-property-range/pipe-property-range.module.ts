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

import { PipePropertyRangeComponent } from './pipe-property-range.component';
import { PipePropertyRangeRoutingModule } from './pipe-property-range-routing.module';
import { pipeProperty_RangeReducers } from 'src/app/store/pipe-properties/pipe-property-range/pipe-property-range.reducers';
import { PipeProperty_RangeEffects } from 'src/app/store/pipe-properties/pipe-property-range/pipe-property-range.effects';

@NgModule({
  declarations: [
    PipePropertyRangeComponent,
  ],
  imports: [
    CommonModule,
    PipePropertyRangeRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    StoreModule.forFeature('pipeProperty_Range', pipeProperty_RangeReducers),
    EffectsModule.forFeature([PipeProperty_RangeEffects]),
  ]
})
export class PipePropertyRangeModule { }
