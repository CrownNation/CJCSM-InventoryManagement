import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationHubComponent } from './notification-hub/notification-hub.component';
import { SearchPipeComponent } from './search-pipe/search-pipe.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeViewComponent } from './pipe-view/pipe-view.component';

@NgModule({
  declarations: [
    NotificationHubComponent,
    SearchPipeComponent,
    PipeViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
    ],
  exports: [
    NotificationHubComponent,
    SearchPipeComponent,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
