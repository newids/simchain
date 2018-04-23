import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TransactionRoutingModule} from './transaction-routing.module';
import {TransactionComponent} from './transaction.component';

@NgModule({
  imports: [
    CommonModule, TransactionRoutingModule
  ],
  declarations: [TransactionComponent]
})
export class TransactionModule { }
