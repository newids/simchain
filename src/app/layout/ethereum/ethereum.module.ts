import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EthereumRoutingModule} from './ethereum-routing.module';
import {EthereumComponent} from './ethereum.component';

@NgModule({
  imports: [
    CommonModule, EthereumRoutingModule
  ],
  declarations: [EthereumComponent]
})
export class EthereumModule { }
