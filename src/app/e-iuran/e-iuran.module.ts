import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EIuranPageRoutingModule } from './e-iuran-routing.module';

import { EIuranPage } from './e-iuran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EIuranPageRoutingModule
  ],
  declarations: [EIuranPage]
})
export class EIuranPageModule {}
