import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ESuratPage } from './e-surat.page';

const routes: Routes = [
  {
    path: '',
    component: ESuratPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ESuratPageRoutingModule {}
