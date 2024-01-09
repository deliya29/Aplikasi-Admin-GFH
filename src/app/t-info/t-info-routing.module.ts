import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TInfoPage } from './t-info.page';

const routes: Routes = [
  {
    path: '',
    component: TInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TInfoPageRoutingModule {}
