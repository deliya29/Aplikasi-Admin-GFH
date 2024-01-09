import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TIuranPage } from './t-iuran.page';

const routes: Routes = [
  {
    path: '',
    component: TIuranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TIuranPageRoutingModule {}
