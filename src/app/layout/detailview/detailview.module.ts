import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailviewComponent} from './detailview.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    DetailviewModule
  ],
  declarations: [DetailviewComponent]
})
export class DetailviewModule { }
