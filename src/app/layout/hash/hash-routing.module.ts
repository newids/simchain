import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HashComponent} from './hash.component';

const routes: Routes = [
  {
    path: '',
    component: HashComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HashRoutingModule {}
