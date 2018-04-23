import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopUserRoutingModule} from './pop-user-routing.module';
import {PopUserComponent} from './pop-user.component';

@NgModule({
  imports: [
    CommonModule, PopUserRoutingModule
  ],
  declarations: [PopUserComponent]
})
export class PopUserModule { }
