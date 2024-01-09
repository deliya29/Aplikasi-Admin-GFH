import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ESuratPageRoutingModule } from './e-surat-routing.module';

import { ESuratPage } from './e-surat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ESuratPageRoutingModule
  ],
  declarations: [ESuratPage]
})
export class ESuratPageModule {}
