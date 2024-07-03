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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PipeDefinitionSelectComponent } from './pipe-definition-select/pipe-definition-select.component';

@NgModule({
  declarations: [
    NotificationHubComponent,
    PipeViewComponent,
    PipeDefinitionSelectComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatAutocompleteModule,
    ],
  exports: [
    ReactiveFormsModule,
    MatSortModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NotificationHubComponent,
    PipeViewComponent,
    MatAutocompleteModule
  ]
})
export class SharedModule { }
