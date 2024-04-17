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

import { PipePropertySizeComponent } from './pipe-property-size.component';
import { PipePropertySizeRoutingModule } from './pipe-property-size-routing.module';
import { pipeProperty_SizeReducers } from 'src/app/store/pipe-properties/pipe-property-size/pipe-property-size.reducers';
import { PipeProperty_SizeEffects } from 'src/app/store/pipe-properties/pipe-property-size/pipe-property-size.effects';

@NgModule({
  declarations: [
    PipePropertySizeComponent,
  ],
  imports: [
    CommonModule,
    PipePropertySizeRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    StoreModule.forFeature('pipeProperty_Size', pipeProperty_SizeReducers),
    EffectsModule.forFeature([PipeProperty_SizeEffects]),
  ]
})
export class PipePropertySizeModule { }
