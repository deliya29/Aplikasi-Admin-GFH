import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EPendudukPageRoutingModule } from './e-penduduk-routing.module';

import { EPendudukPage } from './e-penduduk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EPendudukPageRoutingModule
  ],
  declarations: [EPendudukPage]
})
export class EPendudukPageModule {}
