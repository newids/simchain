import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {FormBuilder} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule, NgbCollapse, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbAlertModule,
    NgbCollapseModule,
    LoginRoutingModule],
  declarations: [LoginComponent],
  providers: [FormBuilder]
})
export class LoginModule {
}
