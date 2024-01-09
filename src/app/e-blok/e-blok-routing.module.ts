import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EBlokPage } from './e-blok.page';

const routes: Routes = [
  {
    path: '',
    component: EBlokPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EBlokPageRoutingModule {}
