import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UangKeluarPage } from './uang-keluar.page';

const routes: Routes = [
  {
    path: '',
    component: UangKeluarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UangKeluarPageRoutingModule {}
