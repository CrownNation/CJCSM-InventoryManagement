import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipepropertiesComponent } from './pipeproperties/pipeproperties.component';
import { PipepropertiesRoutingModule } from './pipeproperties-routing.module';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    PipepropertiesComponent,
  ],
  imports: [
    CommonModule,
    PipepropertiesRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class PipepropertiesModule { }
