import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {PublicKeyRoutingModule} from './public-key-routing.module';
import {PublicKeyComponent} from './public-key.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    NgbAlertModule.forRoot(),
    FormsModule,
    PublicKeyRoutingModule
  ],
  declarations: [PublicKeyComponent]
})
export class PublicKeyModule { }
