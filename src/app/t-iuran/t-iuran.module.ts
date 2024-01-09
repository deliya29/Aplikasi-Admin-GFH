import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TIuranPageRoutingModule } from './t-iuran-routing.module';

import { TIuranPage } from './t-iuran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TIuranPageRoutingModule
  ],
  declarations: [TIuranPage]
})
export class TIuranPageModule {}
