import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TSuratPageRoutingModule } from './t-surat-routing.module';

import { TSuratPage } from './t-surat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TSuratPageRoutingModule
  ],
  declarations: [TSuratPage]
})
export class TSuratPageModule {}
