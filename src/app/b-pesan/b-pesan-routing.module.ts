import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BPesanPage } from './b-pesan.page';

const routes: Routes = [
  {
    path: '',
    component: BPesanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BPesanPageRoutingModule {}
