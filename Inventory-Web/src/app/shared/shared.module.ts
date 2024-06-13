import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationHubComponent } from './notification-hub/notification-hub.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeViewComponent } from './pipe-view/pipe-view.component';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NotificationHubComponent,
    PipeViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
    ],
  exports: [
    ReactiveFormsModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NotificationHubComponent,
    PipeViewComponent

  ]
})
export class SharedModule { }
