import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EUangPage } from './e-uang.page';

const routes: Routes = [
  {
    path: '',
    component: EUangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EUangPageRoutingModule {}
