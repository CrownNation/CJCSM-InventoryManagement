import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipeRoutingModule } from './pipe-routing.module';
import { PipeConfigComponent } from './pipe-config/pipe-config.component';
import { PipeAddDefinitionComponent } from './pipe-add-definition/pipe-add-definition.component';
import { PipeCoatingListComponent } from './pipe-coating-list/pipe-coating-list.component';
import { PipeCoatingAddComponent } from './pipe-coating-add/pipe-coating-add.component';
import { PipeTransferComponent } from './pipe-transfer/pipe-transfer.component';
import { DialogPipeTransferComponent } from './dialog-pipe-transfer/dialog-pipe-transfer.component';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    PipeConfigComponent,
    PipeAddDefinitionComponent,
    PipeCoatingListComponent,
    PipeCoatingAddComponent,
    PipeTransferComponent,
    DialogPipeTransferComponent,
    ],
  imports: [
    CommonModule,
    PipeRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    PipeTransferComponent,
    DialogPipeTransferComponent,
    PipeConfigComponent
  ]
})
export class PipeModule { }
