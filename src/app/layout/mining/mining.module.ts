import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {MiningRoutingModule} from './mining-routing.module';
import {MiningComponent} from './mining.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    NgbAlertModule.forRoot(),
    FormsModule,
    NgxDatatableModule,
    MiningRoutingModule
  ],
  declarations: [MiningComponent]
})
export class MiningModule {
}
