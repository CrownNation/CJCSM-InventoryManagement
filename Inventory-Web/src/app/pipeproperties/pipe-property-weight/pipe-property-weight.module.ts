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

import { PipePropertyWeightComponent } from './pipe-property-weight.component';
import { PipePropertyWeightRoutingModule } from './pipe-property-weight-routing.module';
import { pipeProperty_WeightReducers } from 'src/app/store/pipe-properties/pipe-property-weight/pipe-property-weight.reducers';
import { PipeProperty_WeightEffects } from 'src/app/store/pipe-properties/pipe-property-weight/pipe-property-weight.effects';

@NgModule({
  declarations: [
    PipePropertyWeightComponent,
  ],
  imports: [
    CommonModule,
    PipePropertyWeightRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    StoreModule.forFeature('pipeProperty_Weight', pipeProperty_WeightReducers),
    EffectsModule.forFeature([PipeProperty_WeightEffects]),
  ]
})
export class PipePropertyWeightModule { }
