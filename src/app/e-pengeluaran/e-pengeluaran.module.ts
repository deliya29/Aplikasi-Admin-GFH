import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EPengeluaranPageRoutingModule } from './e-pengeluaran-routing.module';

import { EPengeluaranPage } from './e-pengeluaran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EPengeluaranPageRoutingModule
  ],
  declarations: [EPengeluaranPage]
})
export class EPengeluaranPageModule {}
