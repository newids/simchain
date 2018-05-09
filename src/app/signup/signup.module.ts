import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UtilService} from '../interface/util.service';
import {SignupRoutingModule} from './signup-routing.module';
import {SignupComponent} from './signup.component';
import {NgbAlertModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbCollapseModule,
    SignupRoutingModule
  ],
  declarations: [SignupComponent],
  providers: [FormBuilder, UtilService]
})
export class SignupModule {
}
