import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SymmetricKeyComponent} from './symmetric-key.component';

const routes: Routes = [
  {
    path: '',
    component: SymmetricKeyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SymmetricKeyRoutingModule { }
