import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipepropertiesComponent } from './pipeproperties/pipeproperties.component';
import { PipepropertiesRoutingModule } from './pipeproperties-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';
import { PipePropertyCategoryComponent } from './pipe-property-category/pipe-property-category.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { pipeProperty_CategoryReducers } from '../store/pipe-properties/pipe-property-category/pipe-property-category.reducers';
import { PipeProperty_CategoryEffects } from '../store/pipe-properties/pipe-property-category/pipe-property-category.effects';
import { PipePropertyCoatingComponent } from './pipe-property-coating/pipe-property-coating.component';
import { pipeProperty_CoatingReducers } from '../store/pipe-properties/pipe-property-coating/pipe-property-coating.reducers';
import { PipeProperty_CoatingEffects } from '../store/pipe-properties/pipe-property-coating/pipe-property-coating.effects';


@NgModule({
  declarations: [
    PipepropertiesComponent,
    PipePropertyCategoryComponent,
    PipePropertyCoatingComponent
  ],
  imports: [
    CommonModule,
    PipepropertiesRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('pipeProperty_Category', pipeProperty_CategoryReducers),
    EffectsModule.forFeature([PipeProperty_CategoryEffects]),
    StoreModule.forFeature('pipeProperty_Coating', pipeProperty_CoatingReducers),
    EffectsModule.forFeature([PipeProperty_CoatingEffects]),
  ]
})
export class PipepropertiesModule { }
