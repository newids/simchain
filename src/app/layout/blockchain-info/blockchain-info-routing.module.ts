import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlockchainInfoComponent} from './blockchain-info.component';

const routes: Routes = [
  {
    path: '',
    component: BlockchainInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockchainInfoRoutingModule { }
