import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {PublicKeyRoutingModule} from './public-key-routing.module';
import {PublicKeyComponent} from './public-key.component';
import {ClipboardModule} from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    NgbAlertModule.forRoot(),
    ClipboardModule,
    FormsModule,
    PublicKeyRoutingModule
  ],
  declarations: [PublicKeyComponent]
})
export class PublicKeyModule {
}
