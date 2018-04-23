import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HackingRoutingModule} from './hacking-routing.module';
import {HackingComponent} from './hacking.component';

@NgModule({
  imports: [
    CommonModule,
    HackingRoutingModule
  ],
  declarations: [HackingComponent]
})
export class HackingModule { }
