import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PublicKeyComponent} from './public-key.component';

const routes: Routes = [
  {
    path: '',
    component: PublicKeyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicKeyRoutingModule { }
