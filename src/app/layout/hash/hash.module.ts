import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HashRoutingModule} from './hash-routing.module';
import {HashComponent} from './hash.component';
import {ClipboardModule} from 'ngx-clipboard';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, FormsModule, ClipboardModule, HashRoutingModule, NgbModule.forRoot()],
  declarations: [HashComponent],
  bootstrap: [HashComponent]
})
export class HashModule {
}
