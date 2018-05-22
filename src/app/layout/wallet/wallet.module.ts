import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {WalletRoutingModule} from './wallet-routing.module';
import {WalletComponent} from './wallet.component';
import {ClipboardModule} from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    NgbAlertModule.forRoot(),
    FormsModule,
    ClipboardModule,
    WalletRoutingModule
  ],
  declarations: [WalletComponent]
})
export class WalletModule {
}
