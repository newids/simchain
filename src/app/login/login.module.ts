import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FormBuilder} from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, LoginRoutingModule],
    declarations: [LoginComponent],
  providers: [FormBuilder]
})
export class LoginModule {}
