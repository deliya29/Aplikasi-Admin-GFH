import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EUserPage } from './e-user.page';

const routes: Routes = [
  {
    path: '',
    component: EUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EUserPageRoutingModule {}
