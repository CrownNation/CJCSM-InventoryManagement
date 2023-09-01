import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipeRoutingModule } from './pipe-routing.module';
import { PipeConfigComponent } from './pipe-config/pipe-config.component';
import { PipeSearchComponent } from './pipe-search/pipe-search.component';
import { PipeAddDefinitionComponent } from './pipe-add-definition/pipe-add-definition.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { PipeCoatingListComponent } from './pipe-coating-list/pipe-coating-list.component';
import { PipeCoatingAddComponent } from './pipe-coating-add/pipe-coating-add.component';


@NgModule({
  declarations: [
    PipeConfigComponent,
    PipeSearchComponent,
    PipeAddDefinitionComponent,
    PipeCoatingListComponent,
    PipeCoatingAddComponent
  ],
  imports: [
    CommonModule,
    PipeRoutingModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule
  ],
  exports: [
    PipeSearchComponent
  ]
})
export class PipeModule { }
