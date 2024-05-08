import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, matFormFieldAnimations } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatInput, MatInputModule } from '@angular/material/input';

import { PipePropertyCoatingComponent } from './pipe-property-coating.component';
import { PipePropertyCoatingRoutingModule } from './pipe-property-coating-routing.module';
import { PipeProperty_CoatingReducers } from 'src/app/store/pipe-properties/pipe-property-coating/pipe-property-coating.reducers';
import { PipeProperty_CoatingEffects } from 'src/app/store/pipe-properties/pipe-property-coating/pipe-property-coating.effects';

@NgModule({
  declarations: [
    PipePropertyCoatingComponent
  ],
  imports: [
    CommonModule,
    PipePropertyCoatingRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    StoreModule.forFeature('pipeProperty_Coating', PipeProperty_CoatingReducers),
    EffectsModule.forFeature([PipeProperty_CoatingEffects]),


  ]
})
export class PipePropertyCoatingModule { }
