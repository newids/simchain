import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SignupRoutingModule} from './signup-routing.module';
import {SignupComponent} from './signup.component';
import {NgbAlertModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbAlertModule,
    NgbCollapseModule,
    SignupRoutingModule
  ],
  declarations: [SignupComponent],
  providers: [FormBuilder]
})
export class SignupModule {
}
