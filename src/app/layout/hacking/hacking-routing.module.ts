import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HackingComponent} from './hacking.component';

const routes: Routes = [
  {
    path: '',
    component: HackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HackingRoutingModule {}
