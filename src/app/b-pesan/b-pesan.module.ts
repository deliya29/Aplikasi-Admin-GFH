import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BPesanPageRoutingModule } from './b-pesan-routing.module';

import { BPesanPage } from './b-pesan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BPesanPageRoutingModule
  ],
  declarations: [BPesanPage]
})
export class BPesanPageModule {}
