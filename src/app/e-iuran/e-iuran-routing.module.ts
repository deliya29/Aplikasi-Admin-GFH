import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EIuranPage } from './e-iuran.page';

const routes: Routes = [
  {
    path: '',
    component: EIuranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EIuranPageRoutingModule {}
