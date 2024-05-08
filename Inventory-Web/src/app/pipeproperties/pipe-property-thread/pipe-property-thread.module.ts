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

import { PipePropertyThreadComponent } from './pipe-property-thread.component';
import { PipePropertyThreadRoutingModule } from './pipe-property-thread-routing.module';
import { pipeProperty_ThreadReducers } from 'src/app/store/pipe-properties/pipe-property-thread/pipe-property-thread.reducers';
import { PipeProperty_ThreadEffects } from 'src/app/store/pipe-properties/pipe-property-thread/pipe-property-thread.effects';

@NgModule({
  declarations: [
    PipePropertyThreadComponent,
  ],
  imports: [
    CommonModule,
    PipePropertyThreadRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    StoreModule.forFeature('pipeProperty_Thread', pipeProperty_ThreadReducers),
    EffectsModule.forFeature([PipeProperty_ThreadEffects]),
  ]
})
export class PipePropertyThreadModule { }
