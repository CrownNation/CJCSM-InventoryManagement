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

import { PipePropertyWallComponent } from './pipe-property-wall.component';
import { PipePropertyWallRoutingModule } from './pipe-property-wall-routing.module';
import { pipeProperty_WallReducers } from 'src/app/store/pipe-properties/pipe-property-wall/pipe-property-wall.reducers';
import { PipeProperty_WallEffects } from 'src/app/store/pipe-properties/pipe-property-wall/pipe-property-wall.effects';

@NgModule({
  declarations: [
    PipePropertyWallComponent,
  ],
  imports: [
    CommonModule,
    PipePropertyWallRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    StoreModule.forFeature('pipeProperty_Wall', pipeProperty_WallReducers),
    EffectsModule.forFeature([PipeProperty_WallEffects]),
  ]
})
export class PipePropertyWallModule { }
