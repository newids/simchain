import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PopWalletComponent} from './pop-wallet.component';

const routes: Routes = [
  {
    path: '',
    component: PopWalletComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopWalletRoutingModule { }
