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

import { PipePropertyCategoryComponent } from './pipe-property-category.component';
import { PipePropertyCategoryRoutingModule } from './pipe-property-category-routing.module';
import { PipeProperty_CategoryEffects } from 'src/app/store/pipe-properties/pipe-property-category/pipe-property-category.effects';
import { pipeProperty_CategoryReducers } from 'src/app/store/pipe-properties/pipe-property-category/pipe-property-category.reducers';

@NgModule({
  declarations: [
    PipePropertyCategoryComponent,
  ],
  imports: [
    CommonModule,
    PipePropertyCategoryRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    StoreModule.forFeature('pipeProperty_Category', pipeProperty_CategoryReducers),
    EffectsModule.forFeature([PipeProperty_CategoryEffects]),
    ]
})
export class PipePropertyCategoryModule { }
