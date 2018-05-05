import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {PopUserComponent} from './pop-user/pop-user.component';
import {PopBlockComponent} from './pop-block/pop-block.component';
import {PopWalletComponent} from './pop-wallet/pop-wallet.component';
import {DetailviewComponent} from './detailview/detailview.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ClipboardModule} from 'ngx-clipboard';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TranslateModule,
    NgbModule.forRoot(),
    NgbDropdownModule.forRoot(),
    NgxDatatableModule,
    ClipboardModule
  ],
  declarations: [LayoutComponent, SidebarComponent, HeaderComponent, PopUserComponent, PopBlockComponent, PopWalletComponent, DetailviewComponent]
})
export class LayoutModule {
}
