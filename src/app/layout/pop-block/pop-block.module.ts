import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopBlockRoutingModule} from './pop-block-routing.module';
import {PopBlockComponent} from './pop-block.component';

@NgModule({
  imports: [
    CommonModule, PopBlockRoutingModule
  ],
  declarations: [PopBlockComponent]
})
export class PopBlockModule { }
