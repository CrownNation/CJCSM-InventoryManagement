import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TallyRoutingModule } from './tally-routing.module';
import { TallyDashboardComponent } from './tally-dashboard/tally-dashboard.component';
import { TallyListComponent } from './tally-list/tally-list.component';
import { TallyAddComponent } from './tally-add/tally-add.component';
import { TallyPipeInComponent } from './tally-pipe-in/tally-pipe-in.component';
import { TallyEquipmentInComponent } from './tally-equipment-in/tally-equipment-in.component';
import { TallyPipeOutComponent } from './tally-pipe-out/tally-pipe-out.component';
import { TallyEquipmentOutComponent } from './tally-equipment-out/tally-equipment-out.component';


@NgModule({
  declarations: [
    TallyDashboardComponent,
    TallyListComponent,
    TallyAddComponent,
    TallyPipeInComponent,
    TallyEquipmentInComponent,
    TallyPipeOutComponent,
    TallyEquipmentOutComponent
  ],
  imports: [
    CommonModule,
    TallyRoutingModule,
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
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatProgressBarModule
  ],
  exports: [TallyAddComponent]
})
export class TallyModule { }
