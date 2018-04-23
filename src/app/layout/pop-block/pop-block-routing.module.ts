import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PopBlockComponent} from './pop-block.component';

const routes: Routes = [
  {
    path: '',
    component: PopBlockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopBlockRoutingModule { }
