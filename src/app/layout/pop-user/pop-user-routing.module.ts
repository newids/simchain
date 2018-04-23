import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PopUserComponent} from './pop-user.component';

const routes: Routes = [
  {
    path: '',
    component: PopUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopUserRoutingModule { }
