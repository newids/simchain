import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MiningComponent} from './mining.component';

const routes: Routes = [
  {
    path: '',
    component: MiningComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiningRoutingModule { }
