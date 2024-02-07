import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipepropertiesComponent } from './pipeproperties/pipeproperties.component';
import { PipepropertiesRoutingModule } from './pipeproperties-routing.module';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { PipePropertyCategoryComponent } from './pipe-property-category/pipe-property-category.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    PipepropertiesComponent,
    PipePropertyCategoryComponent
  ],
  imports: [
    CommonModule,
    PipepropertiesRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class PipepropertiesModule { }
