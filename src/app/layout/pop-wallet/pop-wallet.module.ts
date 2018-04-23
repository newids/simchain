import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopWalletRoutingModule} from './pop-wallet-routing.module';
import {PopWalletComponent} from './pop-wallet.component';

@NgModule({
  imports: [
    CommonModule, PopWalletRoutingModule
  ],
  declarations: [PopWalletComponent]
})
export class PopWalletModule { }
