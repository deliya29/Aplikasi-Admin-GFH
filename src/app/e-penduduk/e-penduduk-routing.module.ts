import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EPendudukPage } from './e-penduduk.page';

const routes: Routes = [
  {
    path: '',
    component: EPendudukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EPendudukPageRoutingModule {}
