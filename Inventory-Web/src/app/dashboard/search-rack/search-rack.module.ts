import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRackComponent } from './search-rack/search-rack.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RackViewComponent } from './rack-view/rack-view.component';
import { PipeDetailViewComponent } from './pipe-detail-view/pipe-detail-view.component';
import { EquipmentDetailViewComponent } from './equipment-detail-view/equipment-detail-view.component';
import { SearchRackRoutingModule } from './search-rack-routing.module';


@NgModule({
  declarations: [
    SearchRackComponent,
    RackViewComponent,
    PipeDetailViewComponent,
    EquipmentDetailViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    SearchRackRoutingModule
  ],
  exports: [
    SearchRackComponent,
    RackViewComponent,
    PipeDetailViewComponent,
    EquipmentDetailViewComponent
  ]
})
export class SearchRackModule { }
