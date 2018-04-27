import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopUserRoutingModule} from './pop-user-routing.module';
import {PopUserComponent} from './pop-user.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {DetailviewModule} from '../detailview/detailview.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    PopUserRoutingModule,
    NgxDatatableModule,
    DetailviewModule
  ],
  declarations: [PopUserComponent]
})
export class PopUserModule {
}
