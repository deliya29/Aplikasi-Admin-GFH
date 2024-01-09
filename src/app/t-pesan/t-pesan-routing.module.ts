import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TPesanPage } from './t-pesan.page';

const routes: Routes = [
  {
    path: '',
    component: TPesanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TPesanPageRoutingModule {}
