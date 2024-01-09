import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EPesanPage } from './e-pesan.page';

const routes: Routes = [
  {
    path: '',
    component: EPesanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EPesanPageRoutingModule {}
