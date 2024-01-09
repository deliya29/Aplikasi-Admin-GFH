import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TBlokPage } from './t-blok.page';

const routes: Routes = [
  {
    path: '',
    component: TBlokPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TBlokPageRoutingModule {}
