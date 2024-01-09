import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TSuratPage } from './t-surat.page';

const routes: Routes = [
  {
    path: '',
    component: TSuratPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TSuratPageRoutingModule {}
