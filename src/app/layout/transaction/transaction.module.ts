import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {TransactionRoutingModule} from './transaction-routing.module';
import {TransactionComponent} from './transaction.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    NgbAlertModule.forRoot(),
    FormsModule,
    TransactionRoutingModule
  ],
  declarations: [TransactionComponent]
})
export class TransactionModule { }
