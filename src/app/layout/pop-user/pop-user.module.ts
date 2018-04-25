import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopUserRoutingModule} from './pop-user-routing.module';
import {PopUserComponent} from './pop-user.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    PopUserRoutingModule
  ],
  declarations: [PopUserComponent]
})
export class PopUserModule { }
