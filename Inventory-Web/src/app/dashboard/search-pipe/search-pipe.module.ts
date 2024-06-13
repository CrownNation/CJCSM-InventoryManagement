import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { SearchPipeComponent } from './search-pipe/search-pipe.component';
import { SearchPipeRoutingModule } from './search-pipe-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SearchPipeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SearchPipeRoutingModule,
    SharedModule,
  ]
})
export class SearchPipeModule { }
