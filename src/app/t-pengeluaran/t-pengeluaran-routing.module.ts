import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TPengeluaranPage } from './t-pengeluaran.page';

const routes: Routes = [
  {
    path: '',
    component: TPengeluaranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TPengeluaranPageRoutingModule {}
