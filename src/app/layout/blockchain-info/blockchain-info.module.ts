import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlockchainInfoRoutingModule} from './blockchain-info-routing.module';
import {BlockchainInfoComponent} from './blockchain-info.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    NgxDatatableModule,
    BlockchainInfoRoutingModule
  ],
  declarations: [BlockchainInfoComponent]
})
export class BlockchainInfoModule { }
