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

import { PipePropertyConditionComponent } from './pipe-property-condition.component';
import { PipePropertyConditionRoutingModule } from './pipe-property-condition-routing.module';
import { PipeProperty_ConditionReducers } from 'src/app/store/pipe-properties/pipe-property-condition/pipe-property-condition.reducers';
import { PipeProperty_ConditionEffects } from 'src/app/store/pipe-properties/pipe-property-condition/pipe-property-condition.effects';

@NgModule({
  declarations: [
    PipePropertyConditionComponent,
  ],
  imports: [
    CommonModule,
    PipePropertyConditionRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    StoreModule.forFeature('pipeProperty_Condition', PipeProperty_ConditionReducers),
    EffectsModule.forFeature([PipeProperty_ConditionEffects]),
  ]
})
export class PipePropertyConditionModule { }
