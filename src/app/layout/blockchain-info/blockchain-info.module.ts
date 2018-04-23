import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlockchainInfoRoutingModule} from './blockchain-info-routing.module';
import {BlockchainInfoComponent} from './blockchain-info.component';

@NgModule({
  imports: [
    CommonModule, BlockchainInfoRoutingModule
  ],
  declarations: [BlockchainInfoComponent]
})
export class BlockchainInfoModule { }
