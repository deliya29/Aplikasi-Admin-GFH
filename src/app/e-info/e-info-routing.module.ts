import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EInfoPage } from './e-info.page';

const routes: Routes = [
  {
    path: '',
    component: EInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EInfoPageRoutingModule {}
