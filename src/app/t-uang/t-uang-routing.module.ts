import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TUangPage } from './t-uang.page';

const routes: Routes = [
  {
    path: '',
    component: TUangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TUangPageRoutingModule {}
