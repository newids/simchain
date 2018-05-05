import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {PopUserComponent} from './pop-user/pop-user.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TranslateModule,
    NgbModule.forRoot(),
    NgbDropdownModule.forRoot(),
    NgxDatatableModule
  ],
  declarations: [LayoutComponent, SidebarComponent, HeaderComponent, PopUserComponent]
})
export class LayoutModule {
}
