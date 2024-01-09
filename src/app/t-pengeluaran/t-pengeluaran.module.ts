import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TPengeluaranPageRoutingModule } from './t-pengeluaran-routing.module';

import { TPengeluaranPage } from './t-pengeluaran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TPengeluaranPageRoutingModule
  ],
  declarations: [TPengeluaranPage]
})
export class TPengeluaranPageModule {}
