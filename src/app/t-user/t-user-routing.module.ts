import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TUserPage } from './t-user.page';

const routes: Routes = [
  {
    path: '',
    component: TUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TUserPageRoutingModule {}
