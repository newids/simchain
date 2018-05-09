import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule, NgbCollapse, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {UtilService} from '../interface/util.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbCollapseModule,
    LoginRoutingModule],
  declarations: [LoginComponent],
  providers: [FormBuilder, UtilService]
})
export class LoginModule {
}
