import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HashRoutingModule} from './hash-routing.module';
import {HashComponent} from './hash.component';
import {ClipboardModule} from 'ngx-clipboard';

@NgModule({
  imports: [CommonModule, FormsModule, ClipboardModule, HashRoutingModule],
  declarations: [HashComponent],
  bootstrap: [HashComponent]
})
export class HashModule {
}
