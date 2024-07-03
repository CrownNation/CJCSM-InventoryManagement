import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTallyComponent } from './search-tally/search-tally.component';
import { TallyViewComponent } from './tally-view/tally-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchTallyRoutingModule } from './search-tally-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';



@NgModule({
  declarations: [
    SearchTallyComponent,
    TallyViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SearchTallyRoutingModule,
    MaterialModule
  ],
  exports:[
    SearchTallyComponent,
    TallyViewComponent
  ]
})
export class SearchTallyModule { }
