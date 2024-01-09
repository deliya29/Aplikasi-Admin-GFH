import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuratMasukPage } from './surat-masuk.page';

const routes: Routes = [
  {
    path: '',
    component: SuratMasukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuratMasukPageRoutingModule {}
