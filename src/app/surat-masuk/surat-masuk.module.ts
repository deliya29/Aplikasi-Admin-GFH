import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuratMasukPageRoutingModule } from './surat-masuk-routing.module';

import { SuratMasukPage } from './surat-masuk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuratMasukPageRoutingModule
  ],
  declarations: [SuratMasukPage]
})
export class SuratMasukPageModule {}
