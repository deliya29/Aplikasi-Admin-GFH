import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TambahPendudukPageRoutingModule } from './tambah-penduduk-routing.module';

import { TambahPendudukPage } from './tambah-penduduk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TambahPendudukPageRoutingModule
  ],
  declarations: [TambahPendudukPage]
})
export class TambahPendudukPageModule {}
